require('angular');
require('angular-mocks');
require('angular-route')
require('../app');
require('../angular/controllers/accountController')
require('../angular/controllers/mainController')
require('../angular/controllers/signInController')

describe('Controllers', function () {

  class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }      
  global.localStorage = new LocalStorageMock;
  beforeEach(function () {
      angular.mock.module('caixa');
  });
  const fakePromise = () => new Promise((resolve) => resolve)
  const _userService = {
    getAccount : fakePromise,
    newAccount : fakePromise,
    updateAccount : fakePromise
  }
  let controller;
  let rootScope
  beforeEach(inject(($controller, $rootScope) => {
    rootScope = $rootScope,
    controller = $controller
  }));

  describe('others', function () {
    it('teste padrão internacional né', function (){
      expect(5).toEqual(5)
    })

    it('accountController', function (){
      const vm = newControllerInstance('accountController')
      vm.createAccount({})
      expect(vm.isCreated).toEqual(true)
    })
  })

  describe('mainController', function(){   
    it('should see if the method is called rightly', function (){
      const vm = newControllerInstance('mainController')
      spyOn(vm, 'withdraw');
      vm.withdraw()
      expect(vm.withdraw).toHaveBeenCalled();
    })
  })

  function newControllerInstance (controllerName) {
    const scope = rootScope.$new()
    controller(`${controllerName}`, {
      $scope: scope,
      userService: _userService
    })

    return scope
  }
});
