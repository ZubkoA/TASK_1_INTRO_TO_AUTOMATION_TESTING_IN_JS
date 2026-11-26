const { expect, browser } = require('@wdio/globals');

describe('START page', () => {
  let page;
  beforeEach(async () => {
    page = await browser.url('/start');
    await browser.waitUntil(
      async () => !(await $('div.loader').isDisplayed()),
      {
        timeout: 15000,
        interval: 200,
        timeoutMsg: 'Page loader did not disappear in time',
      },
    );
  });
  it('should open epam web', async () => {
    const expectedTitle = 'Learn';
    await expect(browser).toHaveTitle(expectedTitle);
  });

  it('should open hamburger menu', async () => {
    const menuBtn = await $('#global_menu_toggle');
    const iframeElement = await $('iframe.GlobalMenuFrame');

    await browser.waitUntil(
      async () => {
        if (
          !(await iframeElement.isExisting()) &&
          (await menuBtn.isClickable())
        ) {
          await menuBtn.click();
        }
        return await iframeElement.isExisting();
      },
      {
        timeout: 20000,
        interval: 500,
        timeoutMsg: 'Hamburger menu iframe did not appear in Firefox',
      },
    );

    const menuIframe = await page.frame({
      selector: 'iframe.GlobalMenuFrame',
    });

    const globalMenu = await menuIframe.$('#global-menu');
    await expect(globalMenu).toBeDisplayed({ wait: 15000 });
  });

  it('should navigate to Cataloge page', async () => {
    const link = await $('#EXPLORE_BUTTON');
    const expectedTitle = 'Catalog | Explore | Learn';
    await link.click();
    await expect(browser).toHaveTitle(expectedTitle);
  });

  it('should navigate to Campus page', async () => {
    const divContainer = await $('[class*="LearnSection_wrapper"]');
    const campusEl = await divContainer.$('.//*[contains(text(), "Campus")]');
    await campusEl.scrollIntoView();
    await campusEl.click();

    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length === 2,
      { timeoutMsg: 'Expected a new tab to open after clicking Campus' },
    );

    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);

    const expectedTitle =
      'Industry-focused free IT courses for beginners | EPAM Campus';
    await expect(browser).toHaveTitle(expectedTitle);

    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
  });
});
