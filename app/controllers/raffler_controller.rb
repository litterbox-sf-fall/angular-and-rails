class RafflerController < ApplicationController

  # return list of all players
  def index
  	@players = Player.all
  end

end
