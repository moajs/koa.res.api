const Koa = require('koa');
const app = new Koa();
const api = require('./index');
const jsonp = require('koa-jsonp')

app.use(api());
app.use(jsonp())


app.use(function (ctx, next){
  ctx.is_jsonp = true;
  
  var data = {
    a:1,
    b:2
  }
  
  // return ctx.api(303, data);
  
  // return ctx.api(404 , data, {
 //    code : 1,
 //    msg  : 'delete failed!'
 //  });
  //
  // this.api(data, {
  //   code : 1,
  //   msg  : 'delete failed!'
  // });
  
  ctx.api_error(data);
});

app.listen(3000);