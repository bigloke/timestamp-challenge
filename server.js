// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:hora?", function (req, res) {
  if (req.params.hora) {
    var laHora = new Date(req.params.hora);
    if(!isNaN(laHora))
    {
      var parseHora = new Date(req.params.hora); 
      var jRespuesta = {"unix": parseHora.getTime(), "utc" : parseHora.toUTCString() }
      res.send(jRespuesta); 
    } else {
        var esUnix = new Date(req.params.hora*1000);
        if (!isNaN(esUnix)) {
          var jRespuesta = {"unix": esUnix.getTime(), "utc" : esUnix.toUTCString() }
        } else {
          var jRespuesta = {"unix": null, "utc" : 'Invalid Date'}
        }
      res.send(jRespuesta);     
    }
    
  } else {
    var fecha = new Date();
    var jRespuesta = {"unix": fecha.getTime(), "utc" : fecha.toUTCString() }
    res.send(jRespuesta ); 
  }
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});