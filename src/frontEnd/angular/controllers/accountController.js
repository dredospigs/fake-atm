angular.module('caixa').controller('accountController', function($scope, $location, $route, userService){

    $scope.createAccount = (user) => {
        const balance = user.balance
        const accountNumber = genNumber()

        const newAccount = newUser(user.name, balance, accountNumber)
        $scope.isCreated = true
        userService.newAccount(newAccount)
        .then(() => {
            Swal.fire(
                `Conta n° ${accountNumber} criada com sucesso!`,
                `O número de sua conta é ${accountNumber}, guarde esse númerokk!`,
                'success'
            ).then(() => {
                localStorage['user'] = accountNumber
                $location.path('/withdraw')
                $route.reload()
            })
        })
        .catch(() => {
            Swal.fire(
                'Erro',
                'Tente novamente mais tarde',
                'error'
            )
        })
    }

    function genNumber(){
        return Math.floor(Math.random() * (Math.floor(999999) - Math.ceil(100000)) + Math.ceil(100000)); 
    }

    function newUser(name, balance, accountNumber){
        return{
            "name" : name,
            "accountNumber" : accountNumber,
            "balance" : balance,
            "history": genHistory(balance)
        }
    }

    function genHistory(balance){
        return [
            {
                "day" : new Date().toLocaleString(),
                "dayBalance" : balance
            }
        ]
    }
})