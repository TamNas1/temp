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
  }
};
// const handle500 = (res, err) => {
//   res.writeHead(500);
//   res.end("server error - 500, resource not found");
//
// }
const handlePage = (str, res) => {
  const filePath = path.join(__dirname, '..' ,'public','layouts',str + "Page.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
    //  handle500(res, err)
    res.end()
    } else {
      res.writeHead(200, extensionTypes.html);
      res.end(file);

    }
  });
};

const handlePublic = (url, res) => {
  const ext = url.split('.')[1];
  let pathFile = path.join(__dirname, '..', url);
  fs.readFile(pathFile, (err, file) => {
    if (err) {
      handle500(res, err)
    } else {
      res.writeHead(200, extensionTypes[ext]);
      res.end(file);
    }
  })
}

module.exports = {
  page:handlePage,
  public:handlePublic
};
