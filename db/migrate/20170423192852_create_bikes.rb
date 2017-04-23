class CreateBikes < ActiveRecord::Migration[5.0]
  def change
    create_table    :bikes do |t|
      t.string      :identifier
      t.integer     :bike_type
      t.date        :start_date
      t.string      :tech_inspection_date
      t.boolean     :blocked,             default: false
      t.boolean     :stolen,              default: false
      t.timestamps                        null: false
    end
  end
end
