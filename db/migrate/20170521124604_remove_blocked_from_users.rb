class RemoveBlockedFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :blocked
  end
end
