class Business < ApplicationRecord
    # has_one_attached :photo
    has_many_attached :photos

    has_many :reviews, dependent: :destroy
end
