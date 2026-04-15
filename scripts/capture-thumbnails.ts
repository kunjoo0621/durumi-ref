import { chromium } from "playwright";
import { categories } from "../src/data/categories";
import * as fs from "fs";
import * as path from "path";

const OUTPUT_DIR = path.join(__dirname, "../public/thumbnails");
const VIEWPORT = { width: 1280, height: 1600 };

async function capture() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const allSites = categories.flatMap((cat) =>
    cat.sites.map((site) => ({ ...site, catId: cat.id }))
  );

  // Check --force flag to recapture all
  const force = process.argv.includes("--force");

  const existing = force
    ? new Set<string>()
    : new Set(
        fs
          .readdirSync(OUTPUT_DIR)
          .filter((f) => f.endsWith("_desktop.jpg"))
          .map((f) => f.replace("_desktop.jpg", ""))
      );

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
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    locale: "ko-KR",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  });

  for (const site of toCapture) {
    const slug = site.url.replace(/[/:]/g, "_");
    const filename = `${slug}_desktop.jpg`;
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

      // Desktop 1280x1600 clip — memory feedback_thumbnail_type.md
      await page.screenshot({
        path: filepath,
        type: "jpeg",
        quality: 82,
        clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
        timeout: 60000,
      });

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
