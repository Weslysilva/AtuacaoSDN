var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var Auth = function() {};

Auth.prototype.updateUser = function(username, password) {

    //console.log(username + password);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("teste");

        var myobj = { name: username, password: password };

        dbo.collection("auth").findOneAndUpdate(myobj, function(err, res) {

            if (err) {
                dbo.collection("auth").insertOne(myobj, function(err, res) {

                    if (err) throw err;
                    console.log("Inserted");
                    db.close();

                });
            }
            console.log("updated");
            db.close();
        });
    });



};

Auth.prototype.test = function() {

    return MongoClient.connect(url).then(function(db) {

        var dbo = db.db("teste");
        var collection = dbo.collection('auth');

        return collection.findOne().toArray();

    }).then(function(items) {
        console.log(items);
        return items;
    });

    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("teste");
    //     dbo.collection("auth").findOne({}, function(err, result) {
    //         if (err) throw err;

    //         db.close();

    //     });

    // });

};


exports.Auth = new Auth();