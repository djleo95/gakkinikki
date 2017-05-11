class CreateInstruments < ActiveRecord::Migration[5.0]
  def change
    create_table :instruments do |t|
      t.integer :manufacture_id
      t.string :name

      t.timestamps
    end
  end
end
