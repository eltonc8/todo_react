class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :provider
      t.uid    :uid
      t.name   :name
      
      t.timestamps null: false
    end
  end
end
