
var request = require("request");
$ = require('jQuery')

//devicesUID('722f8756641f4565a8dcf85f55b55b2c','00:00:70:b3:d5:6c:d7:3f')
// function devicesUID(token,uid){
        
//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//         request.get({
//             headers: {'content-type' : 'application/json','X-Auth-Token' : token },
//             url:     'https://10.192.168.121:8443/sdn/v2.0/net/devices/' + `${uid}`,
//             body:  null,
//             json : true
//           }, function(error, body, response){
            
//             console.log(response);

//             return response;
          
//           });
// }

// var token = "722f8756641f4565a8dcf85f55b55b2c";

// teste(token)
// function teste (){

  
  require("jsdom").env("", function(err, window) {
    if (err) {
      console.error(err);
      return;
    }
    
    var $ = require("jquery")(window);
  });
  
  var YourData=null;
  
  $.ajax({
    url: 'https://10.192.168.121:8443/sdn/v2.0/net/devices/',
    headers: {
      'content-type' : 'application/json',
      'X-Auth-Token' : token 
    },
    method: 'GET',
    dataType: 'json',
    data: YourData,
    success: function(data){
      console.log('succes: '+data);
    }
  });
