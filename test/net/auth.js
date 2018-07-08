
//Faz o login e devolvi um Token.

var request = require("../../bibliotecas/node_modules/request");    

const auth = async function() {
  
  return new Promise((resolve, reject) => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var auth =  {} 
    
    request.post({
        headers: {'content-type' : 'application/json'},
        url:     'https://10.192.168.121:8443/sdn/v2.0/auth',
        body:    { "login": {"user":"sdn","password":"skyline","domain":"sdn"} },
        json : true
      }, function(error, body, response){
      
        if (error) {
          reject(error); 
          return;
        }
        resolve(response.record.token);
        //resolve(response);
      });
    });    
};