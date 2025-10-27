class FixForeignKeyNames < ActiveRecord::Migration[8.0]
  def change
    # Fix posts table foreign key
    rename_column :posts, :users_id, :user_id

    # Fix comments table foreign keys
    rename_column :comments, :posts_id, :post_id
    rename_column :comments, :users_id, :user_id
  end
end
