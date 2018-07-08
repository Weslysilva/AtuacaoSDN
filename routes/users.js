var express = require('express');
var router = express.Router();
var auth = require('../auth_module').Auth;


/* Atualizar credenciais */
router.get('/updateCredentials/:username&:password', function(req, res, next) {

    auth.updateUser(req.params.username, req.params.password);


});


router.get('/', function(req, res, next) {
    // res.setHeader('Content-Type', 'application/json');
    // res.send(auth.test());

    //res.send(auth.test());

    auth.test().then(function(items) {
        console.info('The promise was fulfilled with items!', items);
    }, function(err) {
        console.error('The promise was rejected', err, err.stack);
    });

});


module.exports = router;