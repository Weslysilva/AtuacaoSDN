
var request = require("request");

devicesUID('722f8756641f4565a8dcf85f55b55b2c','00:00:70:b3:d5:6c:d7:3f')
function devicesUID(token,uid){
        
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        request.get({
            headers: {'content-type' : 'application/json','X-Auth-Token' : token },
            url:     'https://10.192.168.121:8443/sdn/v2.0/net/devices/' + `${uid}`,
            body:  null,
            json : true
          }, function(error, body, response){
            
            console.log(response);

            return response;
          
          });
}

