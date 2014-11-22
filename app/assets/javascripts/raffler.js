var app = angular.module("raffler", [
	'raffler.controllers',
	'raffler.resources'
	]);

var resourceModule = angular.module('raffler.resources', ["rails"]);

resourceModule.factory('Player',
  function (railsResourceFactory) {
    var resource = railsResourceFactory({
      url: '/players',
      name: 'player'});
    return resource;
});

var appControllers = angular.module('raffler.controllers', []);

appControllers.controller('RaffleController', [ 
	"$scope",
	"Player",
	function($scope, Player) {

    Player.query().then(function(result) {
    	$scope.players = result;
  	})
 	
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