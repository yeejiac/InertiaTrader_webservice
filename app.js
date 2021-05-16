let express = require('express');
var bodyParser = require('body-parser');
  //載入express模組
let engine = require('ejs-locals');
  //載入ejs-locals 模組
let app = express();

let socket = require('./client');
const client = require('./client');

  // 使用express
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

var serialNum = 1

// 單的種類|網單編號(NID)|委託價|買賣別|盤別|委託種類|商品代號|
// 87|3216549876135(64bytes)|60.5|1|1|1|timestamp string|
// 87|31352|60|1|1|1|KKC|& 

function generateNid()
{
  serialNum++;
  return socket.getnidSerialNum() + serialNum.toString();
}

function generateMsg(side, price)
{
  var sideNum = "1";
  if(side == "Sell")
    sideNum = "2";
  return "87|" + generateNid() + "|" + price + "|"+ sideNum + "|1|1|KKC|&"
}

var loginFlag = false;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    if(loginFlag)
      res.render('index', {'title': '首頁',});
    else
      res.render('login', {'title': '登入',});
})

app.get('/login', function (req, res) {
  res.render('login', {'title': '登入',});
})

app.get('/login/clicked', function (req, res) {
  loginFlag = true;
  socket.getObject().write("1234|0324027|123|&");
  res.redirect('/');
})

app.get('/clicked', (req, res) => {
  try {
    const click = {clickTime: new Date()};
    console.log(click);
    var side = req.query.sideselect;
    var price = req.query.trade_fName;
    var volume = req.query.trade_lName;
    console.log(side)
    console.log(price)
    console.log(volume)
    socket.getObject().write(generateMsg(side, price));
    // res.preventDefault();
    // res.sendStatus(200)
    res.redirect("/");
  } catch (error) {
    res.sendStatus(404)
  }
});

app.get('/connTrader', (req, res) => {
  try 
  {
    const click = {clickTime: new Date()};
    console.log(click);
    socket.getObject().write("1234|0324027|123|&");
    res.sendStatus(200);
  } 
  catch (error) 
  {
    res.sendStatus("404")
  }
  
});

port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});