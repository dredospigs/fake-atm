angular.module('caixa').config(function($routeProvider){
    $routeProvider.when("/signIn",{
        templateUrl: "frontEnd/views/signIn.html",
        controller: "signInController"
    })

    $routeProvider.when("/newaccount",{
        templateUrl: "frontEnd/views/account.html",
        controller: "accountController"
    })

    $routeProvider.when("/withdraw",{
        templateUrl: "frontEnd/views/main.html",
        controller: "mainController"
    })
    
    $routeProvider.otherwise({redirectTo: "/signIn"});
  })