angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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

.controller('RestaurantsCtrl', function($http, $scope) {

//här måste vi ju få med oss allt från formuläret och slänga in i objektet vi skickar.

var refresh = function() {

  $http.get('http://localhost:3050/api/restaurants').success(function(response) {
    console.log("Jag laddar om mig!");
    $scope.restaurants = response;
  });
}

var reload = function() {

  $http({

        method: 'GET',
        url: 'http://localhost:3050/api/restaurants'

      }).then(function successCallback(response) {
          
        //console.log(response.data);

        $scope.restaurants = response.data;

        }, function errorCallback(response) {

        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert("ERROR: " + response.data);

    });

}

$scope.postFunk = function(name, address, info, img) {

  $http.post('http://localhost:3050/api/newres', {name: name, address: address, info: info, img: img});

  refresh();
  reload();

}

  $http({

      method: 'GET',
      url: 'http://localhost:3050/api/restaurants'

    }).then(function successCallback(response) {
        
      //console.log(response.data);

      $scope.restaurants = response.data;

      }, function errorCallback(response) {

      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert("ERROR: " + response.data);

  });

})

.controller('resByIdCtrl', function($http, $scope, $stateParams) {

var id = $stateParams.resById;

$http({

      method: 'GET',
      url: 'http://localhost:3050/api/restaurants/' + id

    }).then(function successCallback(response) {
        
      console.log(response.data);

      $scope.resById = response.data[0];

      }, function errorCallback(response) {

      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert("ERROR: " + response.data);

    });
    
});
