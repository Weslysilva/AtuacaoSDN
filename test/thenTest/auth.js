
//Faz o login e devolvi um Token.

var request = require("request");    

var auth = new Promise (function (resolve, resject) {
  
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
     request.post({
         
        headers: {'content-type' : 'application/json'},
        url:     'https://10.192.168.121:8443/sdn/v2.0/auth',
        body:    { "login": {"user":"sdn","password":"skyline","domain":"sdn"} },
        json : true
      }, function(error, body, response){

        if (error) reject(error);
        else resolve (response);   

      });
});

Promise.then( function(value) {

    console.log(value)

});