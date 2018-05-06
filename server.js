var words = {
  "rainbow": 5,
  "unicorn": 3,
  "doom": -3
};

const express = require('express');
var path = require('path');

const app = express();

//app.use(express.static('pacmani veebileht'));

app.get('/public/:game', startGame);
//app.use(express.static('public'));

//app.use(express.static(__dirname + '/views'));
app.use('/', express.static(path.join(__dirname, 'pacWeb')))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/static2', express.static(path.join(__dirname, 'public2')))
app.use('/static3', express.static(path.join(__dirname, 'pacmani veebileht')))

app.get('/public', function(req, res){
    res.render('/index.html');
});

function startGame(request, responce){
  var data = request.params;

  responce.send("Game started " + data.game + " !");
}

app.get('/all', sendAll);

function sendAll(request, responce){
  responce.send(words);
}

app.listen(process.env.PORT || 8080, () => console.log('All is ok!'));
