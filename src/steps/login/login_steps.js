const { I } = inject();

  Given('I am on oranum at Login page', () => {
    I.amOnPage('https://broadcaster.oranum.com/en/login');
  });

  When('I log in using an unregistered account', () => {
    I.fillField('//input[@id="emailOrNick"]', 'test@test.com');
    I.fillField('//input[@id="password"]', 'password');
    I.click("Login");
  });

  Then(/^a message "(.*)" is displayed$/, (message) => {
    I.waitForText(message, 10);
  });