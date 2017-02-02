angular.module('makerswebService', ['ngResource'])
        .factory('recursoCliente', function (Base64, $http, $resource) {
            var authdata = Base64.encode('admin:salmos89');
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            $http.defaults.headers.post["Content-Type"] = "application/json";

            return $resource('http://localhost:8080/spring-rest/api/v1/cliente/:clienteId', null, {
                update: {
                    method: 'PUT'
                }
            });
        })
        .factory('cadastroDeClientes', function (recursoCliente, $q, $rootScope) {
            var service = {};

            service.cadastrar = function (cliente) {
                return $q(function (resolve, reject) {
                    if (cliente.id) {
                        recursoCliente.update({clienteId: cliente.id}, function () {
                            resolve({
                                mensagem: 'O cliente ' + cliente.nome + ' atualizado com sucesso!',
                                inclusao: false
                            });
                        }, function (error) {
                            console.log(error);
                            reject({
                                mensagem: 'Não foi possível alterar a foto ' + foto.titulo
                            });
                        });
                    } else {
                        recursoCliente.save(cliente, function () {
                            resolve({
                                mensagem: 'O cliente ' + cliente.nome + ' incluido com sucesso!',
                                inclusao: true
                            });
                        }, function (error) {
                            console.log(error);
                            reject({
                                mensagem: 'Não foi possível incluir o cliente ' + cliente.nome
                            });
                        });
                    }
                });
            };
            
            return service;
        })
        .factory('Base64', function () {
            /* jshint ignore:start */

            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

            return {
                encode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;

                    do {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);

                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;

                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }

                        output = output +
                                keyStr.charAt(enc1) +
                                keyStr.charAt(enc2) +
                                keyStr.charAt(enc3) +
                                keyStr.charAt(enc4);
                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";
                    } while (i < input.length);

                    return output;
                },

                decode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;

                    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                    var base64test = /[^A-Za-z0-9\+\/\=]/g;
                    if (base64test.exec(input)) {
                        window.alert("There were invalid base64 characters in the input text.\n" +
                                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                                "Expect errors in decoding.");
                    }
                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                    do {
                        enc1 = keyStr.indexOf(input.charAt(i++));
                        enc2 = keyStr.indexOf(input.charAt(i++));
                        enc3 = keyStr.indexOf(input.charAt(i++));
                        enc4 = keyStr.indexOf(input.charAt(i++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        output = output + String.fromCharCode(chr1);

                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }

                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";

                    } while (i < input.length);

                    return output;
                }
            };

            /* jshint ignore:end */
        });


