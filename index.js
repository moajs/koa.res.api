/*!
 * Moajs Middle for Koajs.com
 * Copyright(c) 2015-2019 Alfred Sang <shiren1118@126.com>
 * MIT Licensed
 */

var debug = require('debug')('res.api')
// "use strict";

/**
 * Add X-Response-Time header field.
 *
 * @return {Function}
 * @api public
 */

function api_middleware(options) {
  options = options || {};

  return function middleware(ctx, next){
    debug('use this.api method to render json data...');
    
    ctx.type = 'application/json; charset=utf-8';
    ctx.set('Content-type', 'application/json');
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PATCH ,DELETE');
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  
    ctx.api = api;
    ctx.api_error = api_error;
    
    if (ctx.is_jsonp && ctx.is_jsonp == true) {
      jsonp = require('koa-jsonp')
    }
    
    return next().then(() => {
      
    });
    
  };
}

module.exports = api_middleware;


/**
  Usages:

  // 最通用的api接口
  return res.api(404 ,err, {
    code : 1,
    msg  : 'delete failed!'
  });

  // 返回成功带有状态的json数据
  return res.api(err, {
    code : 1,
    msg  : 'delete failed!'
  });
  
  // 最常用的成功返回json数据
  return res.api(err);

  // 出错
  返回code : 222222222

 */ 
function api(){
  var ctx = this;
  var _res = this.response;
  
  // console.dir()
  // return _res.body = {
//     a:1
//   }
  
  if(typeof(_res) != "object" || _is_not_has_prototype('end')){
    arguments = [];
    console.dir('not a object')
  }
  
  if (arguments.length == 1) {
    var http_code = 200;
    var api_data      = arguments[0];
    var api_status    = {
      code : 0,
      msg  : 'request success!'
    }
    
    return _api(http_code, api_data, api_status);
  } else if (arguments.length == 2) {
    var http_code     = 200;
    var api_data      = arguments[0];
    var api_status    = arguments[1] || {
      code : 0,
      msg  : 'request success!'
    }
    
    return _api(http_code, api_data, api_status);
  } else if (arguments.length == 3) {
    var http_code = arguments[0];
    var api_data      = arguments[1];
    var api_status    = arguments[2];
    
    return _api(http_code, api_data, api_status);
  } else {
    var http_code = 200;
    var api_data      = {};
    var api_status    = {
      code : 222222222,
      msg  : 'res.api params error or res is not a express.response object!'
    }
    
    return _api(http_code, api_data, api_status);
  }
  
  function _is_not_has_prototype(name){
    return !_res.hasOwnProperty(name)&&(name in _res);
  }

  function _api (http_code, data, status) {  
    debug(http_code)
    debug(data)
    debug(status)
    
    if (ctx.is_jsonp && ctx.is_jsonp == true) {
      ctx.status = http_code
      return ctx.body = {
        data    : data,
        status  : status
      }
    } else {
      ctx.status = http_code
      return ctx.body = {
        data    : data,
        status  : status
      }
    }
  }
}

function api_error(data){
  var _res = this;
  var _error_code = 200;
  var _error_status_code = -1;
  var _error_status_msg = 'api error';
  
  if(_res.api_error_code){
    _error_code = _res.api_error_code;
  }
  
  if(_res.api_error_status_code){
    _error_status_code = _res.api_error_status_code;
  }
  
  if(_res.api_error_status_msg){
    _error_status_msg = _res.api_error_status_msg;
  }
  
  _res.api(_error_code, data, {
      code : _error_status_code,
      msg  : _error_status_msg
  });
}
