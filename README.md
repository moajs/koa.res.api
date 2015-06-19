# res.api

[![npm version](https://badge.fury.io/js/res.api.svg)](http://badge.fury.io/js/res.api)


koa.res.api is an koajs middleware for render json api , it convention over api format like this :

    {
      data: {
  
      },
      status: {
        code : x,
        msg  : 'some message'
      }
    }


more see at 

- [cnode 客户端 API 开发总结](https://cnodejs.org/topic/552b3b9382388cec50cf6d95)
- [res.api is an express](https://github.com/moajs/res.api)

## Install

    npm install --save res.api
    
## Usages

    var koa     = require('koa');
    var app     = koa();    
    var res_api = require('koa.res.api');
    
    app.use(res_api());
    
  
then in some route 

### way 1：最通用的api接口

    this.api(404 , err, {
      code : 1,
      msg  : 'delete failed!'
    });


the response header is :

    HTTP/1.1 404 Not Found
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Access-Control-Allow-Headers: X-Requested-With,content-type, Authorization
    Content-Type: application/json; charset=utf-8
    Content-Length: 239
    ETag: W/"ef-6e66e2da"
    set-cookie: connect.sid=s%3ApwL-xMS2tCh3qgqp_wyIqukbUKFeJv6S.2EB4449yTlxRWZrRyBXRc9J6Pv%2BNz4M7j35VLIlxE6M; Path=/; Expires=Wed, 17 Jun 2015 15:11:28 GMT; HttpOnly
    Date: Wed, 17 Jun 2015 14:41:28 GMT
    Connection: keep-alive
    
response json data
    
    {
      "data": {
        "message": "Cast to ObjectId failed for value \"557a3e326221681d474cf078sdsds\" at path \"_id\"",
        "name": "CastError",
        "kind": "ObjectId",
        "value": "557a3e326221681d474cf078sdsds",
        "path": "_id"
      },
      "status": {
        "code": 1,
        "msg": "delete failed!"
      }
    }
### way 2：返回成功带有状态的json数据

    
    this.api(data, {
      code : 1,
      msg  : 'delete failed!'
    });
    

the response header is :

    HTTP/1.1 200 Ok
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Access-Control-Allow-Headers: X-Requested-With,content-type, Authorization
    Content-Type: application/json; charset=utf-8
    Content-Length: 239
    ETag: W/"ef-6e66e2da"
    set-cookie: connect.sid=s%3ApwL-xMS2tCh3qgqp_wyIqukbUKFeJv6S.2EB4449yTlxRWZrRyBXRc9J6Pv%2BNz4M7j35VLIlxE6M; Path=/; Expires=Wed, 17 Jun 2015 15:11:28 GMT; HttpOnly
    Date: Wed, 17 Jun 2015 14:41:28 GMT
    Connection: keep-alive
    
response json data
    
    {
      "data": {
        "message": "Cast to ObjectId failed for value \"557a3e326221681d474cf078sdsds\" at path \"_id\"",
        "name": "CastError",
        "kind": "ObjectId",
        "value": "557a3e326221681d474cf078sdsds",
        "path": "_id"
      },
      "status": {
        "code": 1,
        "msg": "delete failed!"
      }
    }

### way 3：最常用的成功返回json数据

    this.api(data);

the response header is :

    HTTP/1.1 200 Ok
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Access-Control-Allow-Headers: X-Requested-With,content-type, Authorization
    Content-Type: application/json; charset=utf-8
    Content-Length: 239
    ETag: W/"ef-6e66e2da"
    set-cookie: connect.sid=s%3ApwL-xMS2tCh3qgqp_wyIqukbUKFeJv6S.2EB4449yTlxRWZrRyBXRc9J6Pv%2BNz4M7j35VLIlxE6M; Path=/; Expires=Wed, 17 Jun 2015 15:11:28 GMT; HttpOnly
    Date: Wed, 17 Jun 2015 14:41:28 GMT
    Connection: keep-alive
    
response json data


    {
      "data": {
        "message": "Cast to ObjectId failed for value \"557a3e326221681d474cf078sdsds\" at path \"_id\"",
        "name": "CastError",
        "kind": "ObjectId",
        "value": "557a3e326221681d474cf078sdsds",
        "path": "_id"
      },
      "status": {
        "code": 0,
        "msg": "request success!"
      }
    }

### way 4：快捷错误处理

    this.api_error(err);
    
the response header is :

    HTTP/1.1 200 Ok
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Access-Control-Allow-Headers: X-Requested-With,content-type, Authorization
    Content-Type: application/json; charset=utf-8
    Content-Length: 239
    ETag: W/"ef-6e66e2da"
    set-cookie: connect.sid=s%3ApwL-xMS2tCh3qgqp_wyIqukbUKFeJv6S.2EB4449yTlxRWZrRyBXRc9J6Pv%2BNz4M7j35VLIlxE6M; Path=/; Expires=Wed, 17 Jun 2015 15:11:28 GMT; HttpOnly
    Date: Wed, 17 Jun 2015 14:41:28 GMT
    Connection: keep-alive

response json data
 
    {
      "data": {
        "message": "Cast to ObjectId failed for value \"557a3e326221681d474cf078sdsds\" at path \"_id\"",
        "name": "CastError",
        "kind": "ObjectId",
        "value": "557a3e326221681d474cf078sdsds",
        "path": "_id"
      },
      "status": {
        "code": -1,
        "msg": "api error"
      }
    }


## video

给res.api录了一段7分钟的视频(res.api和koa.res.api是一样，只是res.api是基于express)：

http://pan.baidu.com/s/1eQo4xqi

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## Version History

- v1.0.0 初始化版本

## 欢迎fork和反馈

- write by `i5ting` shiren1118@126.com

如有建议或意见，请在issue提问或邮件

## License

this repo is released under the [MIT
License](http://www.opensource.org/licenses/MIT).
