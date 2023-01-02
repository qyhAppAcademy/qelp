class ChangeBusiness2 < ActiveRecord::Migration[7.0]
  def change
    change_column :businesses, :country, :string, null: false
  end
end
