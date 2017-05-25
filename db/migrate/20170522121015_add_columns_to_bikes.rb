class AddColumnsToBikes < ActiveRecord::Migration[5.0]
  def change
    add_column :bikes, :start_date, :date
    add_column :bikes, :blocked, :boolean, default: false
    add_column :bikes, :stolen, :boolean, default: false
  end
end
