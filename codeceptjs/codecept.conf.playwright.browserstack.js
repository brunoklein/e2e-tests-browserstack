let commonCodeceptConf = require('./codecept.conf.common');
const isHeadless = false;
const defaultTimeout = 15000;

let args = [
  '--no-sandbox',
  '--disable-gpu',
  '--disable-setuid-sandbox',
  '--disable-web-security',
  '--use-fake-device-for-media-stream',
  '--use-fake-ui-for-media-stream',
  '--start-fullscreen',
  '--ignore-certificate-errors',
  '--enable-blink-features=HTMLImports',
];

let Playwright = {
  url: 'https://broadcaster.oranum.com/en/login',
  browser: 'chromium',
  restart: true,
  host: 'hub-cloud.browserstack.com',
  port: 4444,
  protocol: 'https',
  outputDir: '../output',
  timeout: defaultTimeout,
  waitForAction: 750,
  keepBrowserState: false,
  keepCookies: false,
  waitForNavigation: 'domcontentloaded',
  ignoreHTTPSErrors: true,
  show: !isHeadless,
  firefox: {
    slowMo: 50,
    args: args,
    firefoxUserPrefs: {
      'media.navigator.streams.fake': true,
      'media.navigator.permission.disabled': true,
    },
    timeout: 0,
  },
  webkit: {
    slowMo: 50,
    args: args,
    timeout: 0,
  },
  chromium: {
    slowMo: 10,
    args: args,
    timeout: 0,
  },
  chrome: {
    slowMo: 10,
    args: args,
    timeout: 0,
  },
};

let parallel = {
  chunks: process.env.WORKERS,
  browsers: [process.env.BROWSER],
};

const capsDesktop = {
  browser: 'chrome',
  os: 'osx',
  os_version: 'catalina',
  name: 'Debug Desktop E2E Tests',
  build: 'Debug Desktop E2E Tests',
  'browserstack.networkLogs': true,
  'browserstack.username': process.env.BROWSERSTACK_USERNAME_SECRET,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY_SECRET,
  'client.playwrightVersion': '1.38.1',
};

const capsMobile = {
  browser: 'chrome',
  os: 'android',
  device: 'Galaxy S23',
  os_version: '13.0',
  realMobile: 'true',
  context: 'mobile',
  name: 'Debug Mobile E2E Tests',
  build: 'Debug Mobile E2E Tests',
  'browserstack.networkLogs': true,
  'browserstack.username': process.env.BROWSERSTACK_USERNAME_SECRET,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY_SECRET,
  'client.playwrightVersion': '1.38.1',
};

const caps = process.env.PLATFORM === 'mobile' ? capsMobile : capsDesktop;

const ignoreSecurityPermissions =
  '&arg=--disable-web-security&arg=--use-fake-device-for-media-stream&arg=--use-fake-ui-for-media-stream&arg=--ignore-certificate-errors';
const wsEndpoint = `wss://cdp.browserstack.com/playwright?headless=${isHeadless}&caps=${encodeURIComponent(JSON.stringify(caps))}&proxy=${
  process.env.GLOBAL_AGENT_HTTPS_PROXY
}${ignoreSecurityPermissions}`;

Playwright.firefox.browserWSEndpoint = { wsEndpoint: `${wsEndpoint}` };
Playwright.webkit.browserWSEndpoint = { wsEndpoint: `${wsEndpoint}` };
Playwright.chromium.browserWSEndpoint = { wsEndpoint: `${wsEndpoint}` };
Playwright.chrome.browserWSEndpoint = { wsEndpoint: `${wsEndpoint}` };

let selenoid = {
  enabled: true,
  deletePassed: false,
  autoCreate: false,
  autoStart: false,
  sessionTimeout: '10m',
  enableVideo: false,
  enableLog: true,
  enableVNC: true,
};

commonCodeceptConf.helpers = {
  ...commonCodeceptConf.helpers,
  Playwright,
};

commonCodeceptConf.multiple = {
  ...commonCodeceptConf.multiple,
  parallel,
};

commonCodeceptConf.plugins = {
  ...commonCodeceptConf.plugins,
  selenoid,
};

exports.config = commonCodeceptConf;
