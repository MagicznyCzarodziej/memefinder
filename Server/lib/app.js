"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var ip = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 8080;
app.get('/', function (req, res) {
  return res.send('Hello World!');
});
app.listen(port, ip, function () {
  console.log("Listening on port ".concat(port));
});