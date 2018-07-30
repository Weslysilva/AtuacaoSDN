var auth = require('./auth_module').Auth;
var rp = require('request-promise');


var Mid = module.exports = {

    visitaCount: 1,
    tokenAtual: "",

    //Busca e retorna token no banco em primeira visita
    //a partir da segunda retorna obj em memoria (if false) -
    //(if true - Atualiza junto ao controlador o token e atualiza nas estruturas)
    obterToken: function(condition) {

        return new Promise(function(resolve, reject) {


            if (!condition) {

                if (visitaCount == 1) {

                    auth.getAuth().then(function(user) {

                        Mid.tokenAtual = `${user.token}`;
                        Mid.visitaCount += 1;
                        resolve(Mid.tokenAtual)
                    }, function(err) {
                        console.error('Erro ao obter Objeto User no Banco, verifique o serviço', err, err.stack);
                        reject(null)

                    })
                } else resolve(Mid.tokenAtual)


            } else {

                auth.getAuth().then(async function(user) {

                    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

                    var options = {
                        method: 'POST',
                        uri: 'https://10.192.168.121:8443/sdn/v2.0/auth',
                        body: { "login": { "user": `${user.name}`, "password": `${user.password}`, "domain": "sdn" } },
                        json: true
                    };


                    try {

                        //console.log(options)
                        var resposta = await rp(options);
                        Mid.tokenAtual = resposta.record.token

                        auth.updateToken(Mid.tokenAtual).then(function() {

                            resolve(Mid.tokenAtual)

                        }).catch(function(err) {

                            console.log("erro durante atualização do token no banco")
                            reject(null)
                        })
                    } catch (err) {
                        console.log('Erro ao obter token atualizado junto ao controlador, verifique conexão ou credenciais', err, err.stack)
                        reject(null)
                    }

                }, function(err) {
                    console.error('Erro ao obter Objeto User no Banco, verifique o serviço', err, err.stack);
                    reject(null)

                })

            }

        })

    },

    //Retorna obj auth
    getUser: async function() {

        var result
        await (auth.getAuth().then(function(items) {

            result = items
        }, function(err) {
            console.error('Promise rejeitada', err, err.stack);
        }))

        return result
    }



}