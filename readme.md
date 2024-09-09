E2E Test Debug Application - BrowserStack

### Requirements

- NodeJS v18.18.2

### Installation

```
npm install
```

### Run command

(1) Set the values for BROWSERSTACK_USERNAME_SECRET and BROWSERSTACK_ACCESS_KEY_SECRET;

(2) Run the below command:

#### BrowserStack desktop command (working)

```
PLATFORM=desktop \
BROWSERSTACK_USERNAME_SECRET=username \
BROWSERSTACK_ACCESS_KEY_SECRET=secret \
npx codeceptjs run --config=./codeceptjs/codecept.conf.playwright.browserstack.js --grep '@login' --steps
```


#### BrowserStack mobile command (not working)

We can see the session being created on BS but the test execution fails due:

  Error: Cannot connect to websocket endpoint.

  Please make sure remote browser is running and accessible.

```
PLATFORM=mobile \
BROWSERSTACK_USERNAME_SECRET=username \
BROWSERSTACK_ACCESS_KEY_SECRET=secret \
npx codeceptjs run --config=./codeceptjs/codecept.conf.playwright.browserstack.js --grep '@login' --steps
```