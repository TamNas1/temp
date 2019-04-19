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
const handle500 = (res, err) => {
  res.writeHead(500);
  res.end("server error - 500, resource not found");

}
const indexHandler = (str, res) => {
  const filePath = path.join(__dirname, '..', 'public', `${str}Page.html`);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      handle500(res, err)
    } else {
      res.writeHead(200, exType.html);
      res.write(file);
    }
    res.end();
  });
};

module.exports = {
  index: indexHandler,
};
