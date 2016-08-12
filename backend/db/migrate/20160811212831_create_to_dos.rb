class CreateToDos < ActiveRecord::Migration
  def change
    create_table :to_dos do |t|
      t.string :text, null: false
      t.boolean :checked, default: false
      t.timestamps null: false
    end
  end
end
