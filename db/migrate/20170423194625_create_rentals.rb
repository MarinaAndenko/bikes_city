class CreateRentals < ActiveRecord::Migration[5.0]
  def change
    create_table     :rentals do |t|
      t.references   :bike,      foreign_key: true
      t.references   :user,      foreign_key: true
      t.datetime     :start_time
      t.datetime     :end_time
      t.float        :sum,       precision: 2
      t.timestamps               null: false
    end
  end
end
