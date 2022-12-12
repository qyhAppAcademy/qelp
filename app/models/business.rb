class Business < ApplicationRecord
    # has_one_attached :photo
    has_many_attached :photos
end
