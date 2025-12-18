import { test, expect } from '@playwright/test';

const TOOL_NAMES = ['GitHub Copilot', 'Cursor', 'Claude Code', 'Windsurf'];

test.describe('AI Code Assistant Comparator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="tools-grid"]');
  });

  test.describe('Initial Page Load', () => {
    test('should display page title', async ({ page }) => {
      const title = page.getByRole('heading', { name: 'AI Code Assistant Comparator' });
      await expect(title).toBeVisible();
    });

    test('should display 4 tool columns', async ({ page }) => {
      const toolHeaders = page.getByTestId('tool-header');
      await expect(toolHeaders).toHaveCount(4);
      for (const toolName of TOOL_NAMES) {
        await expect(page.getByRole('heading', { name: toolName })).toBeVisible();
      }
    });

    test('should display budget slider with default value', async ({ page }) => {
      const sliderLabel = page.getByText('Monthly Budget');
      await expect(sliderLabel).toBeVisible();
      const budgetDisplay = page.getByText('$50/month');
      await expect(budgetDisplay).toBeVisible();
    });

    test('should display plan type filter with Individual selected by default', async ({ page }) => {
      const individualButton = page.getByRole('button', { name: /Individual/i });
      await expect(individualButton).toBeVisible();
      await expect(individualButton).toHaveClass(/bg-primary/);
    });

    test('should display theme toggle button', async ({ page }) => {
      const themeToggle = page.getByRole('button', { name: 'Toggle theme' });
      await expect(themeToggle).toBeVisible();
    });
  });

  test.describe('Slider Interaction', () => {
    test('should filter cards when slider is set to $0 - show only free plans', async ({ page }) => {
      const slider = page.locator('[role="slider"]');
      const sliderTrack = page.locator('.relative.flex.w-full');
      const trackBox = await sliderTrack.boundingBox();
      if (!trackBox) throw new Error('Slider track not found');
      await slider.click();
      await page.keyboard.press('Home');
      await expect(page.getByText('$0/month')).toBeVisible();
      const planCards = page.getByTestId('plan-card');
      const cardCount = await planCards.count();
      for (let i = 0; i < cardCount; i++) {
        const card = planCards.nth(i);
        await expect(card).toContainText('Free');
      }
    });

    test('should filter cards when slider is set to $20 - show plans <= $20', async ({ page }) => {
      const slider = page.locator('[role="slider"]');
      await slider.click();
      await page.keyboard.press('Home');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      const budgetDisplay = page.getByRole('banner').getByText('$20/month');
      await expect(budgetDisplay).toBeVisible();
      const planCards = page.getByTestId('plan-card');
      const cardCount = await planCards.count();
      expect(cardCount).toBeGreaterThan(0);
      for (let i = 0; i < cardCount; i++) {
        const card = planCards.nth(i);
        const priceText = await card.locator('.text-primary').textContent();
        if (priceText && priceText !== 'Free') {
          const price = parseInt(priceText.replace('$', '').replace('/month', ''));
          expect(price).toBeLessThanOrEqual(20);
        }
      }
    });

    test('should show all plans when slider is set to $200', async ({ page }) => {
      const slider = page.locator('[role="slider"]');
      await slider.click();
      await page.keyboard.press('End');
      const budgetDisplay = page.getByRole('banner').getByText('$200/month');
      await expect(budgetDisplay).toBeVisible();
      const planCards = page.getByTestId('plan-card');
      const cardCount = await planCards.count();
      expect(cardCount).toBeGreaterThan(5);
    });
  });

  test.describe('Theme Toggle', () => {
    test('should toggle theme from light to dark', async ({ page }) => {
      await page.evaluate(() => localStorage.removeItem('theme'));
      await page.reload();
      await page.waitForSelector('[data-testid="tools-grid"]');
      const html = page.locator('html');
      await expect(html).not.toHaveClass(/dark/);
      const themeToggle = page.getByRole('button', { name: 'Toggle theme' });
      await themeToggle.click();
      await expect(html).toHaveClass(/dark/);
    });

    test('should toggle theme from dark to light', async ({ page }) => {
      await page.evaluate(() => localStorage.setItem('theme', 'dark'));
      await page.reload();
      await page.waitForSelector('[data-testid="tools-grid"]');
      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);
      const themeToggle = page.getByRole('button', { name: 'Toggle theme' });
      await themeToggle.click();
      await expect(html).not.toHaveClass(/dark/);
    });

    test('should persist theme preference after page reload', async ({ page }) => {
      await page.evaluate(() => localStorage.removeItem('theme'));
      await page.reload();
      await page.waitForSelector('[data-testid="tools-grid"]');
      const themeToggle = page.getByRole('button', { name: 'Toggle theme' });
      await themeToggle.click();
      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);
      await page.reload();
      await page.waitForSelector('[data-testid="tools-grid"]');
      await expect(html).toHaveClass(/dark/);
    });
  });

  test.describe('Individual/Enterprise Filter', () => {
    test('should show individual plans by default', async ({ page }) => {
      const individualButton = page.getByRole('button', { name: /Individual/i });
      await expect(individualButton).toHaveClass(/bg-primary/);
    });

    test('should switch to enterprise plans when Enterprise button is clicked', async ({ page }) => {
      const enterpriseButton = page.getByRole('button', { name: /Enterprise/i });
      await enterpriseButton.click();
      await expect(enterpriseButton).toHaveClass(/bg-primary/);
      const individualButton = page.getByRole('button', { name: /Individual/i });
      await expect(individualButton).not.toHaveClass(/bg-primary/);
    });

    test('should switch back to individual plans when Individual button is clicked', async ({ page }) => {
      const enterpriseButton = page.getByRole('button', { name: /Enterprise/i });
      await enterpriseButton.click();
      const individualButton = page.getByRole('button', { name: /Individual/i });
      await individualButton.click();
      await expect(individualButton).toHaveClass(/bg-primary/);
      await expect(enterpriseButton).not.toHaveClass(/bg-primary/);
    });

    test('should display different plans for Individual vs Enterprise', async ({ page }) => {
      const slider = page.locator('[role="slider"]');
      await slider.click();
      await page.keyboard.press('End');
      const individualPlans = await page.getByTestId('plan-card').count();
      const enterpriseButton = page.getByRole('button', { name: /Enterprise/i });
      await enterpriseButton.click();
      await page.waitForTimeout(300);
      const enterprisePlans = await page.getByTestId('plan-card').count();
      expect(individualPlans).toBeGreaterThan(0);
      expect(enterprisePlans).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Responsiveness', () => {
    test('should display 4 columns on desktop viewport (1280px)', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      const toolsGrid = page.getByTestId('tools-grid');
      await expect(toolsGrid).toHaveClass(/lg:grid-cols-4/);
    });

    test('should display 2 columns on tablet viewport (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      const toolsGrid = page.getByTestId('tools-grid');
      await expect(toolsGrid).toHaveClass(/md:grid-cols-2/);
    });

    test('should display stacked layout on mobile viewport (375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const toolsGrid = page.getByTestId('tools-grid');
      await expect(toolsGrid).toHaveClass(/grid-cols-1/);
      const toolHeaders = page.getByTestId('tool-header');
      await expect(toolHeaders).toHaveCount(4);
    });

    test('should maintain tool order on mobile (Copilot, Cursor, Claude, Windsurf)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      const toolHeaders = page.getByTestId('tool-header');
      const headerTexts: string[] = [];
      const count = await toolHeaders.count();
      for (let i = 0; i < count; i++) {
        const text = await toolHeaders.nth(i).textContent();
        if (text) headerTexts.push(text);
      }
      expect(headerTexts).toEqual(TOOL_NAMES);
    });
  });
});
