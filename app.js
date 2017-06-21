var express = require('express');
var moment = require('moment');
var path = require('path');
var app = express();

app.get('/', function(req, res) {
  var fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Sent:', fileName);
    } //end else
  }); //end res.sendFile
}); //end app.get

app.get('/:dateVal', function(req,res) {    
    var input = req.params.dateVal;
    
    if(input>=0 && input<=8640000000000) {
        res.json({
            unix: input,
            natural: moment.unix(input).format('MMMM DD, YYYY')
        }); //end res.json
    } else if (moment(input).unix()) {
        res.json({
            unix: moment(input).unix(),
            natural: input
        }); //end res.json
    } else {
        res.json({
            unix: null,
            natural: null
        }); //end res.json
    } //end else
}); //end app.get

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("Listening on port: " + port);
});