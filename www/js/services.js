angular.module('starter.services', [])

.factory('Connect', function($firebaseArray) {

	var ref = new Firebase('https://restaurantsappsylt.firebaseio.com/');

	var rest = $firebaseArray(ref);

	var Connect = {

		all: rest,
		delete: ref,
		update: ref,
		get: function(itemId) {

			return rest.$getRecord(itemId);
			
		}

	};

	return Connect;

	//return $firebaseArray(ref);
	
});
