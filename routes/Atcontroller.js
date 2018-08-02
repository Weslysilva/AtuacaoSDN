var express = require('express');
var router = express.Router();
var auth = require('../auth_module').Auth;
var request = require("request");
var mid = require('../midAuth');


//Consulta todos os dispositivos da rede.
router.get('/getDevices', function(req, res, next) {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //Correcao forca o uso do Https sem o certificado valido.
    var TK = mid.obterToken(false).then(function(token) { res.send(token) })
        request.get(TK, item)({
            headers: {'content-type' : 'application/json','X-Auth-Token' : TK },
            url:     'https://10.192.168.121:8443/sdn/v2.0/net/devices',
            body:  null,
            json : true
          }, function(error, body, response){

            console.log(response);
            item.send(response);
          
          });
});



/* 

/////////////


/////////////

*/



//Coleta dados de um dispositivo especifico
router.get('/getDevice', async function(req, res, next) {

    mid.obterToken(true).then(function(items) { res.send(items) }).catch(function() { console.log('erro') })
    
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //Correcao forca o uso do Https sem o certificado valido.

        request.get({
            headers: {'content-type' : 'application/json','X-Auth-Token' : token },
            url:     'https://10.192.168.121:8443/sdn/v2.0/net/devices/' + `${uid}`,
            body:  null,
            json : true
          }, function(error, body, response){
            
            console.log(response);

            return response;
          
          });
});




/* 

/////////////


/////////////

*/





//Coleta a tabela de encaminhamento de um dispositivo.
router.get('/get', async function(req, res, next) {

    //mid.obterToken(true).then(function(items) { res.send(items) }).catch(function() { console.log('erro') })
    
    await mid.obterToken(false).then(function(token) { res.send(token) })
    var TK = res;

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //Correcao forca o uso do Https sem o certificado valido.

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

});




/* 

/////////////


/////////////

*/






module.exports = router;