import { expect, test } from '@playwright/test';

test.describe('home', () => {
  test('renders the English homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Eason Chang'
    );
    await expect(page.getByRole('link', { name: 'all posts' })).toBeVisible();
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

test.describe('meta routes', () => {
  for (const path of [
    '/feed.xml',
    '/atom.xml',
    '/feed.json',
    '/sitemap.xml',
    '/robots.txt',
  ]) {
    test(`serves ${path}`, async ({ request }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
    });
  }
});

test.describe('not found', () => {
  test('unknown URLs return the 404 page', async ({ page }) => {
    const response = await page.goto('/definitely-not-a-real-page');
    expect(response?.status()).toBe(404);
    await expect(page.getByText('404')).toBeVisible();
  });
});
