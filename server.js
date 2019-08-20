const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('/public'));

app.get('/:image',function(req,res,next){
  let path=''
    var options = {
        root:__dirname+ '/public',
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
      
  var fileName = 'index.html'
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log(req.params.image)
    }
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
 