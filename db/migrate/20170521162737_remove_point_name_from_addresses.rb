class RemovePointNameFromAddresses < ActiveRecord::Migration[5.0]
  def change
    remove_column :addresses, :point_name
  end
end
