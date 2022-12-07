class CreateBusinesses < ActiveRecord::Migration[7.0]
  def change
    create_table :businesses do |t|
      t.string :name, null:false
      t.string :address, null:false
      t.string :city, null:false
      t.string :state, null:false
      t.string :zip_code, null:false
      t.decimal :lat, null: false
      t.decimal :lng, null: false
      t.datetime :open, null:false
      t.datetime :close, null:false
      t.string :category, null:false
      t.string :price, null:false
      t.string :phone_number, null:false
      t.string :website

      t.timestamps
    end
    add_index :businesses, :name
    add_index :businesses, :address, unique: true 
    add_index :businesses, :city 
    add_index :businesses, :zip_code
  end
end
