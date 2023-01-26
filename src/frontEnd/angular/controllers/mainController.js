angular.module('caixa').controller('mainController', function($scope, $location, $route, userService){
    var user

    function getCurrentUser(){
        const accountNumber = localStorage['user']
        if(accountNumber === ''){
            $location.path('/signIn')
            $route.reload();
        }
        else{
            userService.getAccount(accountNumber)
            .then((res) => {
                user = res.data[0]
                loadData()
            })
        }
    }

    function loadData(){
        $scope.name = user.name
        $scope.currentBalance = user.balance
        $scope.infos = user.history
    }

    function calculateWithdrawNote(value){
        const notes = [100, 50, 20, 10];
        let result = {};
        
        for (let i = 0; i < notes.length; i++) {
          let note = notes[i];
          if (value >= note) {
            let counter = Math.floor(value / note);
            value = value - (counter * note);
            result['n'+note] = counter;
          }
        }
      
        return result;
    }
    $scope.calculateWithdrawNote = calculateWithdrawNote

    $scope.withdraw = (withdrawValue) => {
        if(withdrawValue > $scope.currentBalance){
            Swal.fire(
                'Erro',
                "Você não possui essa quantia em sua conta atual",
                'error'
            )
        }
        else{
            const notes = calculateWithdrawNote(withdrawValue)
            $scope.withdrawValue = withdrawValue

            $scope.notas = notes
            $('#notesModal').modal('show');
        }
    }

    $scope.confirm = () => {     
        $('#notesModal').modal('hide');   
        const newBalance = $scope.currentBalance - $scope.withdrawValue

        userService.updateAccount(user.accountNumber, {'balance': newBalance})
        .then(() => {
            Swal.fire(
                'Retire seu dinheiro!',
                "O saque foi realizado com sucesso",
                'success'
            )          
            $scope.currentBalance = newBalance 
            newExtract(newBalance)             
        })

        $scope.withdrawValue = ""
    }

    function newExtract(newBalance){
        const oldExtract = user.history
        const newDay = {
            "day" : new Date().toLocaleString(),
            "dayBalance" : newBalance
        }

        const newExtractArray = []
        oldExtract.forEach(info => {
            newExtractArray.push(info)
        });
        newExtractArray.push(newDay)
        userService.updateAccount(user.accountNumber, {'history': newExtractArray})
        .then(() => {
            $infos = newExtractArray
        })
    }

    $scope.logout = () => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você tem certeza que deseja sair?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage['user'] = ''
                $location.path('/signIn')
                $route.reload();
            }
        })
    }

    $scope.showExtract = () => {
        $('#extractModal').modal('show');
    }

    getCurrentUser()
})