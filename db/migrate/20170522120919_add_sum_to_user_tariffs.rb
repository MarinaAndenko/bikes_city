class AddSumToUserTariffs < ActiveRecord::Migration[5.0]
  def change
    add_column :user_tariffs, :sum, :float, precision: 2
  end
end
