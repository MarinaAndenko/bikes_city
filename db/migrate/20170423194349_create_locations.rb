class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table    :locations do |t|
      t.references  :address, foreign_key: true
      t.references  :bike,    foreign_key: true
      t.timestamps            null: false
    end
  end
end
