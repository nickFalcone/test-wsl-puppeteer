const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome',
      headless: true,
      // headless: false, // Failed to launch the browser process! Unable to open X display.
      args: [],
    });

    const page = (await browser.pages())[0];
    //            await browser.newPage() left an `about:blank` page after testing was complete

    const timestamp = new Date().toISOString();

    // Go to stackoverflow.com, hover over the login link, and save a timestamped screenshot
    await page.goto('https://stackoverflow.com/');
    await page.hover('.login-link');
    await page.screenshot({
      path: `screenshots/stackoverflow-login-link-hover-${timestamp}.png`,
    });

    await page.close();
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
