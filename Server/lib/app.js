"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _database = _interopRequireDefault(require("./database.js"));

var _memeController = _interopRequireDefault(require("./controllers/memeController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // const ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
(0, _database.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.get('/all', _memeController.default.getAll);
app.get('/meme/:id', _memeController.default.getById);
app.post('/add', _memeController.default.add);
app.delete('/remove', _memeController.default.delete);
app.post('/update', _memeController.default.update);
app.listen(port, function () {
  console.log("Listening on port ".concat(port));
});