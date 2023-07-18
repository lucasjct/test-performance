import { chromium, devices } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch({ headless: false });
  const iphoneX = devices['iPhone X'];
  const context = browser.newContext(iphoneX);
  const page = context.newPage();

  try {
    await page.goto('https://test.k6.io/');
  } finally {
    page.close();
    browser.close();
  }
}
