class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table   :users do |t|
      t.string     :first_name
      t.string     :last_name
      t.string     :email
      t.string     :phone_number
      t.date       :birthdate
      t.integer    :user_type
      t.boolean    :blocked,     default: false
      t.timestamps               null: false
    end
  end
end
