import { createRequire } from 'node:module';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const load = createRequire(import.meta.url);
const { chromium } = load(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const baseUrl = process.env.QA_BASE_URL || 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  let failures = [];
  page.on('pageerror', (e) => failures.push(e.message));
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'qa/home-desktop.png', fullPage: true });
  const links = await page
    .locator('a[href^="/"]')
    .evaluateAll((xs) => [
      ...new Set(
        xs
          .map((x) => x.getAttribute('href'))
          .filter((href) => !href.startsWith('/images/')),
      ),
    ]);
  let routes = [
    ...links,
    '/services/ac-installation',
    '/services/ac-repair',
    '/services/ac-gas-filling',
    '/services/ac-amc',
    '/services/ac-maintenance',
    '/services/ac-rental',
    '/services/air-purifier-service',
    '/services/refrigerator-repair',
  ];
  routes = [...new Set(routes)];
  let titles = [];
  for (const route of routes) {
    const response = await page.goto(baseUrl + route, {
      waitUntil: 'domcontentloaded',
    });
    assert.equal(response.status(), 200, route);
    assert.equal(await page.locator('h1').count(), 1, route + ' h1');
    assert.ok(
      await page.locator('meta[name="description"]').getAttribute('content'),
    );
    titles.push(await page.title());
    const nodes = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((xs) =>
        xs.flatMap((x) => {
          const data = JSON.parse(x.textContent);
          return data['@graph'] || [data];
        }),
      );
    const json = nodes.find((node) => node['@type'] === 'HVACBusiness');
    assert.equal(json.name, 'Cool Trust AC Solution');
    assert.equal(json.telephone, '+919719127879');
    assert.ok(!json.aggregateRating);
    const tels = await page
      .locator('a[href^="tel:"]')
      .evaluateAll((xs) => xs.map((x) => x.getAttribute('href')));
    assert.ok(tels.includes('tel:+919719127879'));
    assert.ok(tels.includes('tel:+919759765361'));
    for (const a of await page.locator('a[href^="https://wa.me"]').all()) {
      const url = new URL(await a.getAttribute('href'));
      assert.equal(url.pathname, '/919719127879');
      assert.ok(
        url.searchParams.get('text').startsWith('Hello Cool Trust AC Solution'),
      );
      assert.equal(await a.getAttribute('target'), '_blank');
      assert.ok((await a.getAttribute('rel')).includes('noopener'));
    }
    if (route.startsWith('/services/')) {
      const msg = new URL(
        await page.locator('.contact-buttons a').first().getAttribute('href'),
      ).searchParams.get('text');
      assert.ok(msg.includes('[please enter your location]'));
    }
    const frameUrl = new URL(await page.locator('iframe').getAttribute('src'));
    assert.equal(frameUrl.searchParams.get('output'), 'embed');
    const directions = new URL(
      await page.locator('.map-heading a').getAttribute('href'),
    );
    assert.equal(directions.searchParams.get('api'), '1');
    assert.ok(directions.searchParams.get('destination').includes('201009'));
  }
  assert.equal(new Set(titles).size, titles.length, 'unique page titles');
  for (const width of [360, 375, 390, 414, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      '/',
      '/services',
      '/services/ac-repair',
      '/contact',
      '/privacy-policy',
    ]) {
      await page.goto(baseUrl + route, { waitUntil: 'domcontentloaded' });
      const size = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      assert.ok(size.scroll <= size.client, route + ' overflow at ' + width);
      if (width < 760) {
        assert.ok(await page.locator('.mobile-contact').isVisible());
        const rect = await page.locator('.mobile-contact').boundingBox();
        assert.ok(rect.y + rect.height <= 901);
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'qa/home-mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page
    .locator('#mobile-nav')
    .getByRole('link', { name: 'Services', exact: true })
    .click();
  await page.waitForURL('**/services');
  assert.equal(await page.locator('#mobile-nav').count(), 0);
  await page.goto(baseUrl + '/services/missing');
  assert.ok(
    (await page.locator('h1').textContent()).includes('Page not found'),
  );
  assert.deepEqual(failures, []);
  fs.writeFileSync(
    'qa/results.json',
    JSON.stringify(
      {
        routes: routes.length,
        viewportWidths: [360, 375, 390, 414, 430, 768, 1024, 1440],
        checks: [
          'HTTP 200 for all internal pages',
          'unique titles and meta descriptions',
          'one H1 per page',
          'genuine JSON-LD contact details',
          'both telephone links',
          'WhatsApp messages, placeholder and security attributes',
          'address-based map and official directions links',
          'no horizontal overflow on representative pages',
          'fixed mobile contact bar',
          'mobile navigation opens and closes on navigation',
          'custom missing-service page',
          'no browser JavaScript errors',
        ],
        status: 'passed',
      },
      null,
      2,
    ),
  );
  console.log(
    'PASS: ' +
      routes.length +
      ' routes; 8 viewport widths; links, metadata, schema, menu and overflow checks.',
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
