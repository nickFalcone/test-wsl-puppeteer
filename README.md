# Puppeteer on WSL

🚧 ___Incomplete! Any feedback is appreciated!___ 🚧

I spent several hours getting my WSL set up to run Puppeteer. This incomplete guide is a work in progress as I try to document exactly what is required to run Puppeteer on WSL. 



Start with an update/upgrade

```bash
$ sudo apt update && sudo apt upgrade
$ sudo apt install nodejs npm
$ sudo ln -sf /usr/local/bin/node /usr/bin/node
$ sudo apt purge nodejs npm
$ sudo apt clean all
$ sudo apt autoremove
```

Then, clone the repo. Note puppeteer dependency:
```json
"devDependencies": {
  "eslint": "^7.18.0",
  "eslint-config-airbnb-base": "^14.2.1",
  "eslint-plugin-import": "^2.22.1",
  "prettier": "2.2.1",
  "puppeteer": "^5.5.0"
}
```

Follow [setup setuid sandbox](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#alternative-setup-setuid-sandbox)

Then 

```bash
$ git clone git@github.com:nickFalcone/test-wsl-puppeteer.git
$ npm install
$ node screenshot.js
```

`screenshot.js` and has several changes from the original:

- Removed `rimraf` dependency
- Removed constants for `USER_...` and `PROXY_...`
- Modified `executablePath` to `'/usr/bin/google-chrome'`
- Removed `--no-sandbox` arguments as this is [discouraged](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#setting-up-chrome-linux-sandbox).