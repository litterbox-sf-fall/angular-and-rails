class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.boolean :winner
      t.integer :rating

      t.timestamps
    end
  end
end
