// 1 funcao GET


call();
function call(){

    var request = require("../../bibliotecas/node_modules/request");    
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

        request.get({
            headers: {'content-type' : 'application/json','X-Auth-Token' : '735a384dbce340178b143508df3b4a91'},
            url:     'https://10.192.168.121:8443/sdn/v2.0/net/paths/forward',
            body:  null, // { "X-Auth-Token" : '735a384dbce340178b143508df3b4a91' },
            json : true
          }, function(error, body, response){
            
            console.log("--------Erros----");
            console.log(error);
           
            console.log("\n\n\n--------resposta----"); 
            console.log(response);

          });
}