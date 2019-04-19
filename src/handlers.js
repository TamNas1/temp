const fs = require('fs');
const path = require('path');

const extensionTypes = {
  html: {
    'Content-Type': 'text/html',
  },
  css: {
    'Content-Type': 'text/css',
  },
  js: {
    'Content-Type': 'application/javascript',
  },
  ico: {
    'Content-Type': 'image/vnd.microsoft.icon',
  },
  json: {
    'Content-Type': 'application/json',
  },
};
