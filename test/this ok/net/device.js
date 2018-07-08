
function devices(){

    var request = require("../../bibliotecas/node_modules/request");    
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        request.get({
            headers: {'content-type' : 'application/json','X-Auth-Token' : '735a384dbce340178b143508df3b4a91'},
            url:     'https://10.192.168.121:8443/sdn/v2.0/net/devices',
            body:  null,
            json : true
          }, function(error, body, response){
            
            console.log(response);
            return response;
          });
}