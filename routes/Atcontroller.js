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
router.get('/getPathForward', async function(req, res, next) {

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


//Coleta os dados de uma plano de encaminhamento de um dispositivo.
router.get('/getDataPath', async function(req, res, next) {

  var token = await mid.obterToken(false)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.get({
        headers: {'content-type' : 'application/json', 'X-Auth-Token' : token},
        url:     'https://10.192.168.121:8443/sdn/v2.0/of/datapaths/' + `${req.dpid}`, //Utilizar ID do Elemento de Rede.
        body:  null,
        json : true
      }, function(error, body, response){
        if(error) { console.log("Atenção! houve um erro durante a requisição ao controlador\n segue abaixo o log:\n\n"+error) } 
        res.send(response);
      });

});


//Coleta as metricas 
router.get('/getMeter', async function(req, res, next) {

  var token = await mid.obterToken(false)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.get({
        headers: {'content-type' : 'application/json', 'X-Auth-Token' : token},
        url:     'https://10.192.168.121:8443/sdn/v2.0/of/datapaths/' + `${req.dpid}` + '/features/meter', //o Datapath ID deve ser passado na Requsição.
        body:  null,
        json : true
      }, function(error, body, response){
        if(error) { console.log("Atenção! houve um erro durante a requisição ao controlador\n segue abaixo o log:\n\n"+error) } 
        res.send(response);
      });

});

//Edita as metricas 
router.get('/getMeter', async function(req, res, next) {

  var token = await mid.obterToken(false)

    var meters = {
      "version": "1.3.0",
      "meter_features": {
        "max_meters": 8,
        "types": [
          "drop",
          "dscp_remark"
        ],
        "flags": [
          "kbps",
          "pktps"
        ],
        "max_bands_per_meter": 3,
        "max_color_value": 0
      }
    }

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.get({
        headers: {'content-type' : 'application/json', 'X-Auth-Token' : token},
        url:     'https://10.192.168.121:8443/sdn/v2.0/of/datapaths/' + `${req.dpid}` + '/features/meters', //o Datapath ID deve ser passado na Requsição.
        body:  meters,
        json : true
      }, function(error, body, response){
        if(error) { console.log("Atenção! houve um erro durante a requisição ao controlador\n segue abaixo o log:\n\n"+error) } 
        res.send(response);
      });

});








module.exports = router;
