class CreateTariffsDurations < ActiveRecord::Migration[5.0]
  def change
    create_table :tariff_durations do |t|
      t.references :tariff, foreign_key: true
      t.integer   :start_point
      t.integer :end_point
      t.float :price, precision: 2
      t.timestamps null: false
    end
  end
end
