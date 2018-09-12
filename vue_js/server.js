var express = require('express');
// var path = require('path');
var staticServer = require('serve-static');
var app = express();
app.use(staticServer(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
// eslint-disable-next-line
console.log('Serving on port '+ port);
