var koa = require('koa');
var app = koa();


var api = require('./index');

app.use(api());


app.use(function *(){
  // this.api({a:1},{})
  // this.body = 'Hello World';
  var data = {
    a:1,
    b:2
  }
  
  this.api(data);
  
  // this.api(404 , data, {
  //   code : 1,
  //   msg  : 'delete failed!'
  // });
  //
  // this.api(data, {
  //   code : 1,
  //   msg  : 'delete failed!'
  // });
  
  this.api_error(data);
});

app.listen(3000);