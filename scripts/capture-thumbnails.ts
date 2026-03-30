import { chromium } from "playwright";
import { categories } from "../src/data/categories";
import * as fs from "fs";
import * as path from "path";

const OUTPUT_DIR = path.join(__dirname, "../public/thumbnails");
const WIDTH = 1280;
const HEIGHT = 800;
const DEVICE_SCALE = 2;

async function capture() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const allSites = categories.flatMap((cat) =>
    cat.sites.map((site) => ({ ...site, catId: cat.id }))
  );

  const existing = new Set(
    fs.readdirSync(OUTPUT_DIR).map((f) => f.replace(".jpg", ""))
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
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: DEVICE_SCALE,
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
        waitUntil: "networkidle",
        timeout: 20000,
      });

      await page.waitForTimeout(2000);

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

      await page.screenshot({
        path: filepath,
        type: "jpeg",
        quality: 80,
        fullPage: true,
      });

      console.log(`  ✅ ${site.name}`);
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
