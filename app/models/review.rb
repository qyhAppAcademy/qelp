class Review < ApplicationRecord
    validates :rating, inclusion: { in: (1..5), message: "Please select a star rating." } 
    validates :body, presence: { message: "Your review can't be empty." }

    belongs_to :business
    belongs_to :user
end
