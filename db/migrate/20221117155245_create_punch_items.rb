class CreatePunchItems < ActiveRecord::Migration[6.1]
  def change
    create_table :punch_items do |t|
      t.integer :user_id
      t.integer :project_id
      t.string :task
      t.string :area
      t.text :notes
      t.date :complete_by
      t.date :completed_date
      t.integer :days_overdue
      t.boolean :active

      t.timestamps
    end
  end
end
