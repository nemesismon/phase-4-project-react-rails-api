class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :address
      t.string :owner_name
      t.date :complete_by
      t.date :completed_date
      t.integer :days_overdue
      t.boolean :active

      t.timestamps
    end
  end
end
