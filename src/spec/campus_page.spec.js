const { expect, browser } = require('@wdio/globals');

describe('CAMPUS page', () => {
  beforeEach(async () => {
    await browser.url('https://campus.epam.com/en');
  });
  it('mouse move', async () => {
    const link = await $('div[data-name="Trainings"]');
    await link.waitForDisplayed({ timeout: 10000 });

    const borderBeforeHover = await link.getCSSProperty('border-bottom-color');
    const bgBeforeHover = await link.getCSSProperty('background-color');

    // Наводимо курсор (з невеликим зміщенням у центр елемента)
    await link.moveTo();

    // Чекаємо, поки фон реально зміниться з прозорого на білий (#ffffff)
    await browser.waitUntil(
      async () => {
        const bg = await link.getCSSProperty('background-color');
        return bg.parsed.hex === '#ffffff';
      },
      {
        timeout: 5000,
        interval: 200,
        timeoutMsg: 'Background did not become white (#ffffff) after moveTo',
      },
    );

    const borderAfterHover = await link.getCSSProperty('border-bottom-color');
    const bgAfterHover = await link.getCSSProperty('background-color');

    expect(borderAfterHover.parsed.hex).not.toEqual(
      borderBeforeHover.parsed.hex,
    );
    expect(bgAfterHover.parsed.hex).toEqual('#ffffff');
    expect(bgBeforeHover.value).toEqual('rgba(0,0,0,0)');
  });

  it('should navigate to Trainning skills JavaScript in FOOTER', async () => {
    const footerSkills = await $('div[class*="footer_footer-skills__"]');

    const links = await footerSkills.$$(
      '[class*="footer_footer-skills_item"] a',
    );
    await links[1].scrollIntoView();
    await links[1].click();

    const expectedTitle = 'How to become a Junior JavaScript developer? | EPAM';
    await expect(browser).toHaveTitle(expectedTitle);
  });
});
