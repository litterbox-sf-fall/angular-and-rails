var app = angular.module("raffler", [
	'raffler.controllers',
  'raffler.directives',
	'raffler.resources'
	]);

app.config(function (RailsResourceProvider) {
    RailsResourceProvider.rootWrapping(false).updateMethod('patch');
  });

var resourceModule = angular.module('raffler.resources', ["rails"]);

resourceModule.factory('Player',
  function (railsResourceFactory, $q) {
    var resource = railsResourceFactory({
      url: '/players',
      name: 'player'});
    return resource;
});

var appControllers = angular.module('raffler.controllers', []);

appControllers.controller('RaffleController', [ 
	"$scope",
	"$q",
	"Player",
	function($scope, $q, Player) {

    Player.query().then(function(result) {
    	$scope.players = result;
  	})

    
    $scope.saveRating = function (rating, player){
      player.rating = rating;
      player.update();
    }
 	
 		$scope.addPlayer = function() {
			var newPlayer = new Player({
        name: $scope.newName
    	})
      newPlayer.create().then(function(newlyCreatedPlayer){
      	$scope.players.push(newlyCreatedPlayer);
      	$scope.newName = "";
      });
    };

		$scope.drawWinner = function() {
      var pool = [];
      angular.forEach($scope.players, function(player) {
        if (!player.winner) {
          return pool.push(player);
        }
      });
      if (pool.length > 0) {
        var player = pool[Math.floor(Math.random() * pool.length)];
        player.winner = true;
        player.update();
        return $scope.lastWinner = player;
      }
    };

 	}]
);