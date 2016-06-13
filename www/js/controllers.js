angular.module('starter.controllers', [])

.controller('AppCtrl', function($http, $scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

})

.controller('connectCtrl', function($scope, $state, Connect, $stateParams) {

  $scope.getRest = Connect.all;

  $scope.selectedRest = $stateParams.resById;

  $scope.singleRest = Connect.get($stateParams.resById);

  $scope.showEditForm = false;

  $scope.delete = function(id) {

    var deleteById = new Firebase(Connect.delete + id);
    deleteById.remove();

  }

  $scope.edit = function() {

    console.log(Connect.all);

  }

  $scope.save = function(id, name, address, info, img, confirmed) {

    var saveById = new Firebase(Connect.update + id);
    saveById.update({name: name, address: address, info: info, img: img, confirmed: confirmed});

  }

  var likes = null;

  $scope.addLike = function(id) {

    likes = $scope.singleRest.likes;
    likes++;

    var updateById = new Firebase(Connect.update + id);
    updateById.update({likes: likes});

  }

  $scope.confirm = function(i, id) {


    $scope.getRest[i].confirm = true;
    var confirmById = new Firebase(Connect.update + id);
    confirmById.update({confirmed: true});


  }

   $scope.addRest = function(name, address, info, img) {
    
    $scope.name = name;
    $scope.address = address;
    $scope.info = info;
    $scope.img = img;

    $scope.restSave = Connect.all;

    $scope.restSave.$add({

      name: name,
      address: address,
      info: info,
      rate: 0,
      likes: 0,
      confirmed: false,
      img: img

    });
    
    $scope.info = "";

  }

  /*
  $scope.getRest.$loaded(function() {

    if($scope.getRest.length===0) {

      $scope.getRest.$add({

        name: 'Plankan',
        address: "aölskdjfs",
        img: 'plankan.jpeg'

      });

      $scope.getRest.$add({

        name: 'Tullen',
        address: 'aölsdkjösldjf',
        img: 'tullenmariaplan.jpeg'

      });
    
    }

  })
*/

});