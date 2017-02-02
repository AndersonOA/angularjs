angular.module('makersweb').controller('ClienteController', function ($scope, $routeParams, recursoCliente, cadastroDeClientes) {
    $scope.cliente = {};
    $scope.mensagem = '';

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
            cadastroDeClientes.cadastrar($scope.cliente)
                    .then(function (retorno) {
                        $scope.mensagem = retorno.mensagem;
                        if (retorno.inclusao)
                            $scope.cliente = {};
                    })
                    .catch(function (error) {
                        $scope.mensagem = error.mensagem;
                    });
        }
    };
});

