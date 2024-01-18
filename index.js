
var express = require('express');
var path = require('path');
var app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.redirect('index.html');
});

app.listen(port);
console.log('Server started at http://localhost:' + port);