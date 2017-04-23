class CreateTariffs < ActiveRecord::Migration[5.0]
  def change
    create_table :tariffs do |t|
      t.integer  :tariff_type
      t.float    :price,      precision: 2
      t.timestamps            null: false
    end
  end
end
