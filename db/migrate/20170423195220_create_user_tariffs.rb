class CreateUserTariffs < ActiveRecord::Migration[5.0]
  def change
    create_table    :user_tariffs do |t|
      t.references  :tariff,    foreign_key: true
      t.references  :user,      foreign_key: true
      t.date        :start_date
      t.date        :end_date
      t.float       :sum,       precision: 2
      t.timestamps              null: false
    end
  end
end
