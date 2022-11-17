class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :company_name
      t.string :address
      t.string :trade_type
      t.string :point_of_contact
      t.integer :phone
      t.string :email
      t.boolean :active

      t.timestamps
    end
  end
end
