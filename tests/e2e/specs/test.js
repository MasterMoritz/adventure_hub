// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  "landing page": browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible("#app", 5000)
      .assert.containsText("h1", "Welcome to the best Adventures!")
      .end();
  },
  'drawer to overview to adventure': function (browser) {
    browser.url(process.env.VUE_DEV_SERVER_URL)
    .waitForElementVisible("button.v-toolbar__side-icon", 5000)
    .click("button.v-toolbar__side-icon")

    .waitForElementVisible("aside.v-navigation-drawer", 5000)
    .waitForElementVisible('aside.v-navigation-drawer a[href*="overview"]', 5000)
    .click('aside.v-navigation-drawer a[href*="overview"]')
    .useXpath()
    .waitForElementVisible('//div[contains(text(),"Hoolahoop")]', 5000)
    .click('//div[contains(text(),"Hoolahoop")]/ancestor::div[contains(@class, "indigo")]/descendant::button')
    .useCss()
    .waitForElementVisible('div.adventure-text', 5000)
    .assert.visible("div.adventure-text")
    .useXpath()
    .click('//div[contains(@class, "adventure-text")]/parent::div/parent::div/descendant::button')
    .waitForElementVisible('//div[contains(@class, "adventure-text") and contains(text(), tot)]', 5000)
    .end();
  }
};
