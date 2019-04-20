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
  json: {
    'Content-Type': 'application/json',
  },
  png: {
    'Content-Type': 'image/png',
  },
};

const handle500 = (res) => {
  res.writeHead(500);
  res.end('server encountered an error');
};

const handlePage = (str, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'layouts', `${str}Page.html`);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      handle500(res);
    } else {
      res.writeHead(200, extensionTypes.html);
      res.end(file);
    }
  });
};

const handlePublic = (url, res) => {
  const ext = url.split('.')[1];
  const pathFile = path.join(__dirname, '..', url);
  fs.readFile(pathFile, (err, file) => {
    if (err) {
      handle500(res);
    } else {
      res.writeHead(200, extensionTypes[ext]);
      res.end(file);
    }
  });
};

const handleSignIn = (req, res) => {
  let data = "";
  req.on("data", chunk => {
    data += chunk.toString();
  });
  req.on("end", () => {
    if (data != null) {

    }
  }


module.exports = {
  page: handlePage,
  public: handlePublic,
  signIn:handleSignIn
};
