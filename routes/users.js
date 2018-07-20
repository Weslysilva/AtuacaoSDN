var express = require('express');
var router = express.Router();
var auth = require('../auth_module').Auth;
var request = require("request");
var mid = require('../midAuth');


/* Funções exemplo
 Atualizar credenciais */
router.get('/updateCredentials/:username&:password', function(req, res, next) {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.post({

        headers: { 'content-type': 'application/json' },
        url: 'https://10.192.168.121:8443/sdn/v2.0/auth',
        body: { "login": { "user": req.params.username, "password": req.params.password, "domain": "sdn" } },
        json: true
    }, function(error, body, response) {

        if (error) res.send(error);
        else {
            console.log(auth.updateUser(req.params.username, req.params.password, response.record.token));
            res.send(`${response}`);
        }
    });

});

//Consultar obj user no banco
router.get('/getUser', function(req, res, next) {

    mid.getUser().then(function(items) { res.send(items) })

});

//Consulta a token no container (insere no container se == null)
router.get('/getToken', function(req, res, next) {

    mid.add(false).then(function(items) { res.send(items) })

});

//Atualiza token no banco e no container
router.get('/updateToken', async function(req, res, next) {

    let result = mid.add(true);
    if (result) res.send('success')
    else res.send('failure')


});

module.exports = router;