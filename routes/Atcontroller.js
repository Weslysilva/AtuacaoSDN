var express = require('express');
var router = express.Router();
var auth = require('../auth_module').Auth;
var request = require("request");
var mid = require('../midAuth');

//Consulta todos os dispositivos da rede.
router.get('/getDevices',async function(req, res, next) {

  var token = await mid.obterToken(false) //Obtem um token do banco de dados local para realizar a chamada no controlador
  //var token = await mid.obterToken(true) //Obtem um novo token direto do controlador para realizar a chamada e depois atualiza o token do banco.

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //Correcao forca o uso do Https sem o certificado valido.
    request.get({
        headers: {'content-type' : 'application/json','X-Auth-Token' : token },
        url:     'https://10.192.168.121:8443/sdn/v2.0/net/devices',
        body:  null,
        json : true
      },function(error, body, response){
        if(error) { console.log("Atenção! houve um erro durante a requisição ao controlador\n segue abaixo o log:\n\n"+error) } 
        res.send(response);
    });

});


//Coleta dados de um dispositivo especifico
router.get('/getDevice', async function(req, res, next) {

  var token = await mid.obterToken(false)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
    request.get({
        headers: {'content-type' : 'application/json','X-Auth-Token' : token },
        url:     'https://10.192.168.121:8443/sdn/v2.0/net/devices/' + `${req.uid}`, //A string correspondente ao UID deve ser passada dentro do Objeto de requisicao request.
        body:  null,
        json : true
      }, function(error, body, response){
          if(error) { console.log("Atenção! houve um erro durante a requisição ao controlador\n segue abaixo o log:\n\n"+error) } 
          res.send(response);
      
      });
});


//Coleta a tabela de encaminhamento de um dispositivo.
router.get('/get', async function(req, res, next) {

  var token = await mid.obterToken(false)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.get({
        headers: {'content-type' : 'application/json', 'X-Auth-Token' : token},
        url:     'https://10.192.168.121:8443/sdn/v2.0/net/paths/forward',
        body:  null,
        json : true
      }, function(error, body, response){
        if(error) { console.log("Atenção! houve um erro durante a requisição ao controlador\n segue abaixo o log:\n\n"+error) } 
        res.send(response);
      });

});


module.exports = router;
