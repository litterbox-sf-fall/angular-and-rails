
1) clone repo, install, rake seed and inspect


- model
	- rails c Player.all

- controller
- view 
- one route

Goal: Move entrile app to cleint, demote rails to serve as json api


2)

Turning server into an api, moving the app to the client.

- include angular js

```
 <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>

```

- add ng-app
- Test with a random expression expression, like
	- {{ 12.34 | currency }}	

3) Creating the API

Make restful controller for Players
- respond_to :json 
- index update show edit destroy 
	
```
class PlayersController < ApplicationController
  # controller supports json only, it can't render pages
  respond_to :json

  def index
  	# For a given controller action, 
  	# respond_with generates an appropriate 
  	# response based on the mime-type requested 
  	# by the client.
    respond_with Player.all
  end

  def show
    respond_with Player.find(params[:id])
  end

  def create
    respond_with Player.create(params[:player])
  end

  def update
    respond_with Player.update(params[:id], params[:player])
  end

  def destroy
    respond_with Player.destroy(params[:id])
  end
end
```	

add route for resource

	resources :players


test it!

	http://localhost:3000/players.json


4) Replacing server sider rendered erb with client side angular

In raffler.js, create app module

	var app = angular.module("Raffler", []);
	
change `ng-app` tag


use gem 'angularjs-rails-resource', '~> 1.1.1'



Craeta Player factory:

```	
app.factory("Player", ["$resource", function($resource) {
    return $resource("/players/:id", { id: "@id"}, {update: { method: "PUT"}});
  }
]);
```

Create RafflerController

```
app.controller()RaffleCtrl = [
  "$scope", "Entry", function($scope, Entry) {
    $scope.entries = Entry.query();
```

  
  

	
	


 