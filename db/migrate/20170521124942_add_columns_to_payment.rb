class AddColumnsToPayment < ActiveRecord::Migration[5.0]
  def change
    add_column :payments, :sum, :float, precision: 2
    add_column :payments, :confirmed, :boolean, default: false
  end
end
