import { createRequire } from 'node:module';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const load = createRequire(import.meta.url);
const { chromium } = load(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.QA_BASE_URL || 'http://localhost:3001';

async function checkSeo() {
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  assert.equal(urls.length, 15, 'all public pages must appear in the sitemap');
  assert.equal(new Set(urls).size, urls.length, 'no duplicate sitemap URLs');
  const origin = new URL(urls[0]).origin;
  const robots = await (await fetch(base + '/robots.txt')).text();
  assert.ok(robots.includes('Sitemap: ' + origin + '/sitemap.xml'));
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const titles = new Set();
  const descriptions = new Set();
  const report = [];
  try {
    for (const url of urls) {
      assert.equal(new URL(url).origin, origin);
      const pathname = new URL(url).pathname;
      const response = await page.goto(base + pathname, {
        waitUntil: 'domcontentloaded',
      });
      assert.equal(response.status(), 200, pathname);
      assert.equal(await page.locator('h1').count(), 1, pathname);
      const title = await page.title();
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute('content');
      assert.ok(title && description);
      assert.equal(
        title.split('Cool Trust AC Solution').length - 1,
        1,
        'brand appears once in title',
      );
      assert.ok(!titles.has(title), 'unique title: ' + pathname);
      assert.ok(
        !descriptions.has(description),
        'unique description: ' + pathname,
      );
      titles.add(title);
      descriptions.add(description);
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute('href');
      assert.equal(new URL(canonical).origin, origin);
      assert.equal(
        new URL(canonical).pathname.replace(/\/$/, ''),
        pathname.replace(/\/$/, ''),
      );
      assert.equal(
        await page.locator('meta[property="og:title"]').getAttribute('content'),
        title,
      );
      assert.equal(
        await page
          .locator('meta[property="og:site_name"]')
          .getAttribute('content'),
        'Cool Trust AC Solution',
      );
      assert.equal(
        await page.locator('meta[name="twitter:card"]').getAttribute('content'),
        'summary_large_image',
      );
      assert.equal(
        new URL(
          await page
            .locator('meta[property="og:image"]')
            .getAttribute('content'),
        ).origin,
        origin,
      );
      const nodes = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) =>
          scripts.flatMap((script) => {
            const data = JSON.parse(script.textContent);
            return data['@graph'] || [data];
          }),
        );
      const business = nodes.find((node) => node['@type'] === 'HVACBusiness');
      assert.equal(business['@id'], origin + '/#business');
      assert.equal(business.telephone, '+919719127879');
      assert.ok(
        business.contactPoint.some(
          (point) => point.telephone === '+919759765361',
        ),
      );
      assert.ok(
        !business.aggregateRating &&
          !business.geo &&
          !business.openingHoursSpecification &&
          !business.priceRange,
      );
      const website = nodes.find((node) => node['@type'] === 'WebSite');
      assert.equal(website.name, 'Cool Trust AC Solution');
      if (pathname.startsWith('/services/')) {
        const service = nodes.find((node) => node['@type'] === 'Service');
        const breadcrumbs = nodes.find(
          (node) => node['@type'] === 'BreadcrumbList',
        );
        assert.equal(service.provider['@id'], business['@id']);
        assert.equal(service.url, canonical);
        assert.equal(breadcrumbs.itemListElement.length, 3);
        assert.equal(
          await page
            .getByRole('navigation', { name: 'Breadcrumb', exact: true })
            .locator('li')
            .count(),
          3,
        );
        assert.ok(
          (await page.locator('h1').textContent()).includes('Greater Noida'),
        );
      }
      report.push({ path: pathname, title, canonical });
    }
    const missing = await page.request.get(base + '/services/unknown-service');
    assert.equal(missing.status(), 404);
    fs.writeFileSync(
      'qa/seo-results.json',
      JSON.stringify(
        {
          status: 'passed',
          pages: report.length,
          canonicalOrigin: origin,
          checks: [
            'unique titles and descriptions',
            'one visible H1',
            'canonical URL on every page',
            'consistent sharing metadata and images',
            'business and website structured data',
            'service and breadcrumb structured data',
            'visible breadcrumbs',
            'complete sitemap and robots link',
            'missing services return HTTP 404',
          ],
          results: report,
        },
        null,
        2,
      ),
    );
    console.log('PASS: SEO checks across ' + report.length + ' pages.');
  } finally {
    await browser.close();
  }
}
checkSeo().catch((error) => {
  console.error(error);
  process.exit(1);
});
