import { chromium, devices } from "playwright";
import { categories } from "../src/data/categories";
import * as fs from "fs";
import * as path from "path";

const OUTPUT_DIR = path.join(__dirname, "../public/thumbnails");
const device = devices["iPhone 14 Pro"];
const MAX_HEIGHT = 3000; // cap fullPage height

async function capture() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const allSites = categories.flatMap((cat) =>
    cat.sites.map((site) => ({ ...site, catId: cat.id }))
  );

  // Check --force flag to recapture all
  const force = process.argv.includes("--force");

  const existing = force
    ? new Set<string>()
    : new Set(fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".jpg")).map((f) => f.replace(".jpg", "")));

  const toCapture = allSites.filter(
    (site) => !existing.has(site.url.replace(/[/:]/g, "_"))
  );

  if (toCapture.length === 0) {
    console.log("All thumbnails already captured.");
    return;
  }

  console.log(`Capturing ${toCapture.length} thumbnails (${allSites.length - toCapture.length} already exist)...\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...device,
    deviceScaleFactor: 2,
    locale: "ko-KR",
  });

  for (const site of toCapture) {
    const filename = site.url.replace(/[/:]/g, "_") + ".jpg";
    const filepath = path.join(OUTPUT_DIR, filename);
    const url = `https://${site.url}`;

    const page = await context.newPage();

    try {
      console.log(`  ⏳ ${site.name} (${url})`);

      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 25000,
      });

      await page.waitForTimeout(3000);

      // Dismiss cookie/popup overlays
      try {
        await page.evaluate(() => {
          const selectors = [
            '[class*="cookie"]', '[class*="Cookie"]',
            '[class*="consent"]', '[class*="Consent"]',
            '[class*="popup"]', '[class*="modal"]',
            '[class*="banner"]', '[id*="cookie"]',
          ];
          selectors.forEach((sel) => {
            document.querySelectorAll(sel).forEach((el) => {
              (el as HTMLElement).style.display = "none";
            });
          });
        });
      } catch {
        // ignore
      }

      // Try fullPage first, fallback to clip
      try {
        await page.screenshot({
          path: filepath,
          type: "jpeg",
          quality: 80,
          fullPage: true,
        });

        // If fullPage is too tall, re-capture with clip
        const stat = fs.statSync(filepath);
        if (stat.size > 3_000_000) {
          await page.screenshot({
            path: filepath,
            type: "jpeg",
            quality: 75,
            clip: { x: 0, y: 0, width: device.viewport.width, height: MAX_HEIGHT },
          });
        }
      } catch {
        await page.screenshot({
          path: filepath,
          type: "jpeg",
          quality: 80,
          clip: { x: 0, y: 0, width: device.viewport.width, height: MAX_HEIGHT },
        });
      }

      // Verify file is valid (not empty, not too small)
      const stat = fs.statSync(filepath);
      if (stat.size < 5000) {
        fs.unlinkSync(filepath);
        console.log(`  ❌ ${site.name} — captured but too small, removed`);
      } else {
        console.log(`  ✅ ${site.name}`);
      }
    } catch (err) {
      console.log(`  ❌ ${site.name} — ${(err as Error).message.slice(0, 60)}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  const captured = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".jpg")).length;
  console.log(`\nDone! ${captured}/${allSites.length} thumbnails in public/thumbnails/`);
}

capture();
