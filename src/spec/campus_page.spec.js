const { expect, browser } = require('@wdio/globals');

describe('CAMPUS page', () => {
  beforeEach(async () => {
    await browser.url('https://campus.epam.com/en');
  });
  it('mouse move', async () => {
    const link = await $('div[data-name="Trainings"]');
    const borderBeforeHover = await link.getCSSProperty('border-bottom-color');
    const bgBeforeHover = await link.getCSSProperty('background-color');
    await link.moveTo();
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
