class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :business, null: false, foreign_key: true, index: true
      t.references :user, null: false, foreign_key: true, index: true
      t.integer "rating", null: false
      t.string "body", null: false
      t.timestamps
    end
    
    add_index :reviews, [:business_id, :user_id], unique: true
  end
end
