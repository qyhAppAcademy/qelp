class ChangeBusiness < ActiveRecord::Migration[7.0]
  def change
    remove_column :businesses, :country
    add_column :businesses, :country, :string, null: false, default: "USA"
  end
end
