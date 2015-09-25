class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos, force: :cascade do |t|
      t.string     :title, null: false
      t.string     :body
      t.boolean    :done,  null: false, default: false

      t.timestamps         null: false
    end
  end
end
