angular.module('makersweb').controller('ClienteController', function ($scope, $routeParams, recursoCliente, cadastroDeClientes, AuthenticationService) {
    $scope.cliente = {};
    $scope.mensagem = '';

    // reset login status
    AuthenticationService.clearCredentials();

    if ($routeParams.clienteId) {
        recursoCliente.get({clienteId: $routeParams.clienteId}, function (cliente) {
            $scope.cliente = cliente;
        }, function (error) {
            $scope.mensagem = 'Não foi possível encontrar o Cliente.';
            console.log(error);
        });
    }

    $scope.submeter = function () {
        if ($scope.formulario.$valid) {
            console.log($scope.username);
            console.log($scope.password);
            AuthenticationService.login($scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.setCredentials($scope.username, $scope.password);
                    cadastroDeClientes.cadastrar($scope.cliente)
                            .then(function (retorno) {
                                $scope.mensagem = retorno.mensagem;
                                if (retorno.inclusao)
                                    $scope.cliente = {};
                            })
                            .catch(function (error) {
                                $scope.mensagem = error.mensagem;
                            });
                } else {
                    $scope.mensagem = response.message;
                    console.log(response);
                }
            });
        }
    };
});

