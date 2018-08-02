var request = require("request");    

//Begin Test
token = '12196bcf924f43a28e28efc8ce6a8ebe'
forwardPath(token);
//End Test

function forwardPath(token){

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        request.get({
            headers: {'content-type' : 'application/json', 'X-Auth-Token' : token},
            url:     'https://10.192.168.121:8443/sdn/v2.0/net/paths/forward',
            body:  null,
            json : true
          }, function(error, body, response){
            
            console.log("--------Erros----");
            console.log(error);
           
            console.log("\n\n\n--------resposta----"); 
            console.log(response);

          });
}