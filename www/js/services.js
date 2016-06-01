angular.module('starter.services', [])


.service('refresh', function() {

	this.refreshFunc = function() {

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
})
