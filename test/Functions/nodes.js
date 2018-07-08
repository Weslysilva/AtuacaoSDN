
var request = require("request");

nodes('a14ca04c8ff54f4f84c2e3fd409966bc')

function nodes(token,vid,ip,mac,dpid,port){
        
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        request.get({
            headers: {'content-type' : 'application/json','X-Auth-Token' : token },
            url:     'https://10.192.168.121:8443/sdn/v2.0/net/nodes',
            body:  null,
            json : true
          }, function(error, body, response){
            
            console.log(response);

            return response;
          
          });
}