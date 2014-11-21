
##AngularJS and Rails

####Goals:


Building a raffler application: Randomly pick winners from a list of players. Turn rails server into a pure api and move the app functionality into the client.


####1) Getting started:

Clone this repo and explore application.

	bundle
	rake db:create
	rake db:migrate
	rake db:seed
	rails s

[open app in browser](http://localhost:3000)

What does the app do? What are the models, controllers, views?
	
#####A word about turbolinks: [Remove](http://blog.steveklabnik.com/posts/2013-06-25-removing-turbolinks-from-rails-4)!

[What are turbolinks?](http://guides.rubyonrails.org/working_with_javascript_in_rails.html#turbolinks) / [Why remove them?](http://engineering.onlive.com/2014/02/14/turbolinks-the-best-thing-you-wont-ever-use-in-rails-4/)
	

####1) Angularize


a) Add AngularJS gem to Gemfile:

	gem 'angular-gem'
	
We will be using a gem `angularjs-rails-resource` that is specifically designed to work with Rails resources. Add it to Gemfile

	gem 'angularjs-rails-resource', '~> 1.1.1'

b) Turn app into an angular app

	<html ng-app>

c) Quick test	

Embedd a random angular expression in a view and verify it works, for example:

	{{ 12.34 | currency }}	

####2) Turn Rails into api server

Generate RESTful players controller

	rails g controller players index show create update destroy
	

The new controller responds with **json** exclusively.	

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

Add playes resource routes:

	resources :players

Test it!

	http://localhost:3000/players.json

####3) Replace server side ERB with client side Angular

a) We go back to plain HTMl:

* Remove `.erb` from `views/players/index.html.erb`


b) In raffler.js, create angular app module

	var app = angular.module("Raffler", []);
	
c) Add application name to `ng-app` tag



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

  
  

	
	


 