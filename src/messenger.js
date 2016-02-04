'use strict';

const BrowserWindow = require('browser-window')
const path = require('path')
const helper = require('./helper')

module.exports = class Messenger {
  constructor() {
    this.loaded = false

    this.window = new BrowserWindow({
      show: true,
      width: 0,
      height: 0,
      preload: path.join(__dirname, 'window.js')
    });

    let url = path.join("file://", helper.getRoot(), 'views', 'index.html');
    this.window.loadURL(url);

    // NOTE: Useful in debugging client side errors from window.js
    // this.window.webContents.openDevTools();

    this.onLoad(() => {
      require('power-monitor').on('resume', this.reset.bind(this))
    })
  }

  onLoad(cb) {
    this.window.webContents.on('did-finish-load', cb.bind(this))
  }

  reset() {
    this.window.webContents.send('reset')
  }
}