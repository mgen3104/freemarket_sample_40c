class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.string :name, null: false, index: true
      t.integer :price, null: false
      t.text :description
      t.string :condition, null: false
      t.references :first_category, null: false, foreign_key: true
      t.references :second_category, foreign_key: true
      t.references :third_category, foreign_key: true
      t.references :brand, foreign_key: true
      t.integer :seller_id, foreign_key: true
      t.integer :buyer_id, foreign_key: true
      t.timestamps
    end
  end
end
