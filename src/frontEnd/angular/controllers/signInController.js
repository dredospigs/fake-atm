angular.module('caixa').controller('signInController', function($scope, $location, userService){

    $scope.login = (user) => {
        const accountNumber = user.accountNumber

        userService.getAccount(accountNumber)
        .then((res) => {
            const info = res.data
            let hasUser = false

            info.forEach(user => {
                if(user.accountNumber === accountNumber){
                    localStorage['user'] = accountNumber
                    $location.path('/withdraw')
                    hasUser = true
                }
            });

            if(!hasUser){
                Swal.fire(
                    'Erro!',
                    'Houve um erro ao realizar o login, verifique as informações e tente novamente!',
                    'error'
                )
            }
        })
    }
})