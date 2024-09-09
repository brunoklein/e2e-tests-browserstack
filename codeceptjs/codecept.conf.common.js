require('dotenv').config();
require('global-agent/bootstrap');

const { setHeadlessWhen } = require('@codeceptjs/configure');
const isHeadless = false;
setHeadlessWhen(isHeadless);

module.exports = {
  name: 'e2e-tests',
  tests: '../src/tests/**/*_test.js',
  output: '../output',
  bootstrap: null,
  helpers: {
    ChaiWrapper: {
      require: 'codeceptjs-chai',
    },
  },
  include: {
    I: '../src/lib/utils/customActor.js',
  },

  gherkin: {
    features: '../features/**/*.feature',
    steps: '../src/steps/**/*_steps.js',
  },

  multiple: {
    parallel: {
      chunks: process.env.WORKERS,
      browsers: [process.env.BROWSER],
    },
  },

  plugins: {
    pauseOnFail: {
      enabled: true,
    },
    retryFailedStep: {
      enabled: true,
      retries: 1,
    },
    screenshotOnFail: {
      enabled: true,
    },
    allure: {
      enabled: true,
      outputDir: './output/allure',
      enableScreenshotDiffPlugin: false,
      require: '@codeceptjs/allure-legacy'
    },
    tryTo: {
      enabled: true,
    },
    autoDelay: {
      enabled: true,
      delayBefore: 200,
      delayAfter: 200,
    },
  },

  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: true,
          features: true,
        },
      },
      'mocha-junit-reporter': {
        stdout: '-',
        options: {
          mochaFile: 'output/mocha/result.[hash].xml',
        },
      },
    },
  },
};
