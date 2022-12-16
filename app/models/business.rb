class Business < ApplicationRecord
    # has_one_attached :photo
    has_many_attached :photos

    has_many :reviews, dependent: :destroy

    def avg_rating
        sum = 0;
        self.reviews.each do |review|
            sum += review.rating
        end
        return self.reviews ? sum * 1.0 / self.reviews.length : 0
    end

    def reviews_count
        return self.reviews ? self.reviews.length : 0
    end
end
