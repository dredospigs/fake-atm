angular.module("caixa").factory("userService", ($http)=>{

    const _get = function(number){
        return $http({
            url: "http://localhost:4000/user/" + number,
            method: 'GET'
        })
    }

    const _post = function(user){
        return $http.post("http://localhost:4000/user/", user)
    }

    const _put = function(accountNumber, update){
        return $http.put("http://localhost:4000/user/" + accountNumber, update)
    }

    return {
        getAccount : _get,
        newAccount : _post,
        updateAccount : _put
    }
})