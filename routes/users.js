var express = require('express');
var router = express.Router();
var auth = require('../auth_module').Auth;
var request = require("request");
var mid = require('../midAuth');



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