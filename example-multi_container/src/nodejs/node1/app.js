var express = require('express');
var app = express();

app.get('/', (req, res) => {
   res.send('<h1>Working on Node 1</h1>');
});

app.get('/testtest', (req, res) => {
   res.send("You've entered the test page");
});

app.listen(8080, '0.0.0.0');

console.log('Server running at 127.0.0.1:8080');
