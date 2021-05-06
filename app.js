let express = require('express');
  //載入express模組
let engine = require('ejs-locals');
  //載入ejs-locals 模組
let app = express();
  // 使用express
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index', {'title': '首頁',});
})

port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});