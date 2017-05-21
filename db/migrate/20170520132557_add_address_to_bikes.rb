class AddAddressToBikes < ActiveRecord::Migration[5.0]
  def change
    add_reference :bikes, :address, foreign_key: true
  end
end
