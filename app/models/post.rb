class Post < ApplicationRecord
  belongs_to :users
  has_many_attached :photos
end
