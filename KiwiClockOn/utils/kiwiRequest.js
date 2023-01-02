//带着sessionId进行请求，自动获取服务端返回的sessionId存入全局变量中
function kwRequestWithSessionId(requestParam){

  // var app = getApp()

  //三个默认参数的值
  var method = "GET";
  var dataType = "json";
  var responseType = "text";
  //用户输入了参数就替换，没输入就使用默认的
  if ("method" in requestParam)
  {
    method = requestParam.method;
  }
  if ("dataType" in requestParam) {
    dataType = requestParam.dataType;
  }
  if ("responseType" in requestParam) {
    responseType = requestParam.responseType;
  }

  var url = requestParam.url;
  var data = requestParam.data;
  var success = requestParam.success;
  var fail = requestParam.fail;
  var complete = requestParam.complete;

  var cookieStr = "";  //请求报文头中cookie的字符串

  var Cookie = wx.getStorageSync('sessionID') //获取cookie内容
  // var Cookie = app.globalData.session_id;  //获取全局变量中的cookie内容
  cookieStr = Cookie;

  var header = {};
  if ("header" in requestParam)
  {
    header = requestParam.header;
    header["Cookie"] = cookieStr;
  }
  else
  {
    header["Cookie"] = cookieStr;
  }

  wx.request({
    url: url,
    method: method,
    responseType: responseType,
    dataType: dataType,
    data: data,
    header: header,    //每次请求带上sessionId
    success: function(res){

      //先将检查服务器返回报文头中有无sessionId，有则存到全局变量中
      var cookie = res.header["Set-Cookie"];
      if (undefined != cookie)
      {
        if (cookie.indexOf('session=') != -1) {
          // 使用正则表达式把session=XXXXX提取出来
          // 并保存到全局变量和本地中
          var session_id = cookie.match("\\bsession=([^;]*)\\b")
          if (session_id != null) {
            session_id = session_id[0]
          } else {
            session_id = ''
          }
  
          // app.globalData.session_id = session_id
          wx.setStorageSync('sessionID', session_id)
        }
      }
      //执行正常的操作
      success(res, session_id);
    },
    fail: fail,
    complete: complete,
  });
}

export default {
  kwRequestWithSessionId,
}