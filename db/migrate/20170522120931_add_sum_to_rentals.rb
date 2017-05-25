class AddSumToRentals < ActiveRecord::Migration[5.0]
  def change
    add_column :rentals, :sum, :float, precision: 2
  end
end
