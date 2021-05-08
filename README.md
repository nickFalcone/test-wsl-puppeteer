# Set up Puppeteer on WSL2

This guide is a work in progress, adapted from https://ktkr3d.github.io/2020/01/27/Puppeteer-on-WSL/ with [modifications](#diffs).

Any feedback is appreciated! Please open a new [issue](https://github.com/nickFalcone/test-wsl-puppeteer/issues/new) or pull request.

## Prerequisites 

This guide assumes a proper [WSL2 installation](https://docs.microsoft.com/en-us/windows/wsl/install-win10) and was tested on: 

- Windows 10.0.19042 Build 19042
- WSL2 / Ubuntu 20.04.2 LTS
- Node lts/fermium (v14.16.1)

## Upgrade

Start with an update, upgrade, and fresh install of `nodejs` and `npm`

```bash
$ sudo apt update && sudo apt upgrade
$ sudo apt install nodejs npm
$ sudo ln -sf /usr/local/bin/node /usr/bin/node
$ sudo apt purge nodejs npm
$ sudo apt clean all
$ sudo apt autoremove
```

## Clone and install Puppeteer

```bash
$ git clone git@github.com:nickFalcone/test-wsl-puppeteer.git
$ cd test-wsl-puppeteer/
$ npm install puppeteer --unsafe-perm=true -allow-root && sudo apt install chromium-browser -y
```

## Ensure Puppeteer dependencies are installed

https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix

```bash
$ sudo apt update && sudo apt install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```
## Prevent "No usable sandbox!" errors

Follow instructions for [setting up setuid sandbox with Puppeteer](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#alternative-setup-setuid-sandbox), copied below:

> The setuid sandbox comes as a standalone executable and is located next to the Chromium that Puppeteer downloads. It is fine to re-use the same sandbox executable for different Chromium versions, so the following could be done only once per host environment:

```bash
# cd to the downloaded instance
cd node_modules/puppeteer/.local-chromium/linux-<revision>/chrome-linux/
sudo chown root:root chrome_sandbox
sudo chmod 4755 chrome_sandbox
# copy sandbox executable to a shared location
sudo cp -p chrome_sandbox /usr/local/sbin/chrome-devel-sandbox
# export CHROME_DEVEL_SANDBOX env variable
export CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox

# navigate back to main project directory
../../../../..
```

## Run 

```bash
$ node screenshot.js
```

This run a headless Chromium window, navigate to Stack Overflow, hover over the login link, and save a timestamped screenshot to `/screenshots`.

## Issues

Setting `headless: false` throws the following error:

```
Error: Failed to launch the browser process!
[9952:9952:0508/155050.386069:ERROR:browser_main_loop.cc(1386)] Unable to open X display.
```

Currently reviewing this guide for a non-headless solution: https://medium.com/@japheth.yates/the-complete-wsl2-gui-setup-2582828f4577 

## <div id="diffs">Changes from ktkr3d's guide</div>

- Removed `rimraf` dependency
- Removed constants for `USER_...` and `PROXY_...`
- Modified `executablePath` to `'/usr/bin/google-chrome'`
- Removed `--no-sandbox` arguments as this is [discouraged](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#setting-up-chrome-linux-sandbox).