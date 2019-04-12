// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  "default e2e tests": browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible("#app", 5000)
      .assert.containsText("h1", "Welcome to the best Adventures!")
      .assert.elementCount("img", 1)
      
      .end();
  },
  'click button': function (browser){
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .click('button')
      .end();
  }
};
