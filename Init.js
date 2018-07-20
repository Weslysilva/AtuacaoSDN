var MongoClient = require('mongodb').MongoClient;
var auth = require('./auth_module.js').Auth;
var request = require("request");
var mid = require('./midAuth.js');

module.exports.init = function(init, username, password) {


    return new Promise(async function(resolve, reject) {

        if (init) {

            var url = "mongodb://localhost:27017/Caarf";
            MongoClient.connect(url, function(err, db) {

                if (err) {
                    console.log("Database creation error")
                    reject(err)
                    throw err;
                }
                console.log("1 - Database created!");

                var dbo = db.db();

                dbo.createCollection("auth", function(err, res) {
                    if (err) {
                        console.log("Collection creation error")
                        reject(err)
                        throw err
                    }
                    console.log("2 - Collection created!");
                });


                var myobj = { name: username, password: password, token: "" };

                dbo.collection("auth").insertOne(myobj, function(err, res) {

                    if (err) {
                        console.log("Collection insert error")
                        reject(err)
                        throw err
                    }
                    console.log("3 - document inserted");

                    let result = mid.add(true);
                    if (result) console.log('4 - Db Atualizado')
                    else console.log('Erro durante atualização do token')

                });

                db.close();

            });

        } else reject(false);


    });


}