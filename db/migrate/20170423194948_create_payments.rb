class CreatePayments < ActiveRecord::Migration[5.0]
  def change
    create_table    :payments do |t|
      t.references  :user,           foreign_key: true
      t.text        :card_holder
      t.string      :card_number
      t.date        :expiration_date
      t.string      :security_code
      t.timestamps                   null: false
    end
  end
end
