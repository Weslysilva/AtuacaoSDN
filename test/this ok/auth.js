
//Faz o login e devolvi um Token.
auth();
function auth(){

var auth =  {} 

var request = require("request");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

      request.post({
        headers: {'content-type' : 'application/json'},
        url:     'https://10.192.168.121:8443/sdn/v2.0/auth',
        body:    { "login": {"user":"sdn","password":"skyline","domain":"sdn"} },
        json : true
      }, function(error, body, response){
      
        //return (response.record.token),
        console.log(response.record.token);
        //resolve(response);
      }); 
}