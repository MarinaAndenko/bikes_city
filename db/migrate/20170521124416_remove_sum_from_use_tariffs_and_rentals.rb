class RemoveSumFromUseTariffsAndRentals < ActiveRecord::Migration[5.0]
  def change
    remove_column :user_tariffs, :sum
    remove_column :rentals, :sum
  end
end
