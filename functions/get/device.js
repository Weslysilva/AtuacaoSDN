



var auth = require("../../classes/midAuth");
var request = require("request");
var express = require('express');

var router = express.Router();

$.ajax({ url: "https://api.trello.com/1/boards/5af05287b18885781ccff8fb", async: false, data: 
  { 
    fields: `all`, 
    key: '705e38cbad4029223d957fd9b2fe04a4',   
    token: '263c412a1d939a8f26fc8692b896be16bbc26ce80be0fb5bb906f73df933be45' }, 
    success: function( result ) {
                                  board = result;   
                                }
}); 


// router.devices(token){
        
//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//         request.get({
//             headers: {'content-type' : 'application/json','X-Auth-Token' : token },
//             url:     'https://10.192.168.121:8443/sdn/v2.0/net/devices',
//             body:  null,
//             json : true
//           }, function(error, body, response){
//             //console.log(response);
            
//             console.log("\n\n\n\n\n #########\n", response);
            
//             return response;
            
//           });
// }


module.exports = router;
