class RemovePriceFromTariff < ActiveRecord::Migration[5.0]
  def change
    remove_column :tariffs, :price
  end
end
