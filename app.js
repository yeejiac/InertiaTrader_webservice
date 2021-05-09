let express = require('express');
var bodyParser = require('body-parser');
  //載入express模組
let engine = require('ejs-locals');
  //載入ejs-locals 模組
let app = express();

// let socket = require('./client')

  // 使用express
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

var serialNum = 1

function generateMsg(side, price, volumn)
{
    return "88|" + serialNum + "|" + price + "|" + volumn + "|1|KKC|&"
}


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index', {'title': '首頁',});
})

app.get('/clicked', (req, res) => {
  const click = {clickTime: new Date()};
  console.log(click);
  var side = req.query.sideselect;
  var price = req.query.trade_fName;
  var volume = req.query.trade_lName;
  console.log(side)
  console.log(price)
  console.log(volume)
  res.redirect('..');
  // socket.getObject().write("test");
  res.end();
});

port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});