json.user do
    json.partial! '/api/users/user', user: @user

    @user.reviews.includes(:business).each do |review|
        json.reviews do
            json.set! review.id do
                json.partial! 'api/reviews/review', review: review
                json.business do
                    json.extract! review.business, :id, :name, :address, :city, :state, :zip_code, :category, :price
                    json.photoUrl review.business.photos.first, :url
                end
            end
        end
    end
end