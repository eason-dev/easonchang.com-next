import { expect, test } from '@playwright/test';

test.describe('home', () => {
  test('renders the English homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Eason Chang'
    );
    await expect(page.getByRole('link', { name: 'all posts' })).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'all projects' })
    ).toBeVisible();
    await expect(page.getByText('Build in Public')).toBeVisible();
  });

  test('renders the zh-TW homepage', async ({ page }) => {
    await page.goto('/zh-TW');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Eason Chang'
    );
    await expect(page.getByText('最新文章')).toBeVisible();
  });
});

test.describe('posts', () => {
  test('lists posts with a working search filter', async ({ page }) => {
    await page.goto('/posts');
    const articles = page.locator('main li');
    await expect(articles.first()).toBeVisible();

    await page
      .getByPlaceholder('Search title or description')
      .fill('nonexistent-gibberish-term');
    await expect(page.getByText('No posts found.')).toBeVisible();
  });

  test('groups the listing by year and collapses series posts', async ({
    page,
  }) => {
    await page.goto('/posts');
    await expect(
      page.getByRole('heading', { name: '2022', exact: true })
    ).toBeVisible();

    const seriesCard = page.getByText('Modern Next.js Blog Series', {
      exact: true,
    });
    await expect(seriesCard).toBeVisible();
    await seriesCard.click();
    await expect(
      page.getByRole('link', { name: /Series Introduction/ })
    ).toBeVisible();
  });

  test('renders a post page with TOC and comments anchor', async ({ page }) => {
    await page.goto('/zh-TW/posts/less-but-better');
    await expect(page.getByRole('article')).toContainText('少，但是更好');
    await expect(page.locator('#comment')).toBeAttached();
  });

  test('redirects legacy filename URLs to the canonical slug', async ({
    page,
  }) => {
    const response = await page.goto('/posts/2016-03-17-less-but-better');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/posts\/less-but-better$/);
  });
});

test.describe('projects', () => {
  test('renders project cards with working optimized images', async ({
    page,
  }) => {
    await page.goto('/projects');
    const firstImage = page.locator('main img').first();
    await expect(firstImage).toBeVisible();

    // Guard against image-optimizer config regressions (e.g. Next 16
    // rejecting quality values missing from images.qualities): the image
    // must actually decode, not just exist in the DOM.
    await expect
      .poll(() =>
        firstImage.evaluate((img) => (img as HTMLImageElement).naturalWidth)
      )
      .toBeGreaterThan(0);
  });
});

test.describe('meta routes', () => {
  for (const path of [
    '/feed.xml',
    '/atom.xml',
    '/feed.json',
    '/sitemap.xml',
    '/robots.txt',
    '/llms.txt',
    '/llms-full.txt',
  ]) {
    test(`serves ${path}`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
    });
  }

  test('serves raw markdown for posts', async ({ request }) => {
    const response = await request.get('/zh-TW/posts/less-but-better.md');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/markdown');
    expect(await response.text()).toContain('少，但是更好');
  });

  test('404s raw markdown for unknown posts', async ({ request }) => {
    const response = await request.get('/posts/not-a-real-post.md');
    expect(response.status()).toBe(404);
  });
});

test.describe('not found', () => {
  test('unknown URLs return the 404 page', async ({ page }) => {
    const response = await page.goto('/definitely-not-a-real-page');
    expect(response?.status()).toBe(404);
    await expect(page.getByText('404')).toBeVisible();
  });
});
