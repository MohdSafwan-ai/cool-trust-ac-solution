import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const load = createRequire(import.meta.url);
const { chromium } = load(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.QA_BASE_URL || 'http://localhost:3001';
const agent =
  'Mozilla/5.0 (compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot)';

async function checkDiscovery() {
  const robotResponse = await fetch(base + '/robots.txt', {
    headers: { 'User-Agent': agent },
  });
  assert.equal(robotResponse.status, 200);
  const robots = await robotResponse.text();
  assert.match(robots, /User-Agent: OAI-SearchBot\s+Allow: \//i);
  assert.match(robots, /User-Agent: \*\s+Allow: \//i);
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  assert.equal(urls.length, 15);
  for (const url of urls) {
    const response = await fetch(base + new URL(url).pathname, {
      headers: { 'User-Agent': agent },
    });
    assert.equal(response.status, 200, url);
    assert.ok(
      !/noindex/i.test(response.headers.get('x-robots-tag') || ''),
      url,
    );
  }
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    const data = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) =>
        scripts
          .map((script) => JSON.parse(script.textContent))
          .find((data) => data['@type'] === 'FAQPage'),
      );
    assert.equal(data.mainEntity.length, 6);
    const items = page.locator('.faq-item');
    assert.equal(await items.count(), 6);
    for (let index = 0; index < 6; index++) {
      assert.equal(
        (await items.nth(index).locator('summary span').textContent()).trim(),
        data.mainEntity[index].name,
      );
      assert.equal(
        (await items.nth(index).locator('p').textContent()).trim(),
        data.mainEntity[index].acceptedAnswer.text,
      );
      await items.nth(index).locator('summary').click();
      assert.ok(
        await items.nth(index).locator('p').isVisible(),
        'native FAQ works without scripts',
      );
    }
    for (const width of [360, 375, 390, 414, 430, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        'overflow at ' + width,
      );
    }
    assert.ok(
      !/ChatGPT|\bAI\b|OAI-SearchBot/.test(
        await page.locator('main').innerText(),
      ),
      'visible content stays business-focused',
    );
    fs.writeFileSync(
      'qa/search-discovery-results.json',
      JSON.stringify(
        {
          status: 'passed',
          publicPages: urls.length,
          faqAnswers: 6,
          checks: [
            'explicit search crawler permission',
            'all public pages return HTTP 200 with search crawler user agent',
            'production responses do not send noindex headers',
            'visible FAQ and structured answers match',
            'native FAQ works without JavaScript',
            'no overflow at eight viewport widths',
            'visible text stays focused on business services',
          ],
          limitation:
            'Test requests use the documented user-agent string. They do not prove an actual search crawler visit or guarantee inclusion.',
        },
        null,
        2,
      ),
    );
    console.log(
      'PASS: crawler request checks across 15 pages; matching FAQ content, no-JavaScript operation and 8 viewport widths.',
    );
  } finally {
    await browser.close();
  }
}
checkDiscovery().catch((error) => {
  console.error(error);
  process.exit(1);
});
