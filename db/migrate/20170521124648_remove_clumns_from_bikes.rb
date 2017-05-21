class RemoveClumnsFromBikes < ActiveRecord::Migration[5.0]
  def change
    remove_column :bikes, :blocked
    remove_column :bikes, :stolen
    remove_column :bikes, :start_date
    remove_column :bikes, :tech_inspection_date
  end
end
