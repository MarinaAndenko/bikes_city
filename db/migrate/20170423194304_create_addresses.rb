class CreateAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table   :addresses do |t|
      t.string     :point_name
      t.text       :full_address
      t.timestamps               null: false
    end
  end
end
