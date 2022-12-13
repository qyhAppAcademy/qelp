json.business do
    json.partial! '/api/businesses/business', business: @business

    @business.reviews.includes(:user).each do |review|
        json.reviews do
            json.set! review.id do
                json.partial! 'api/reviews/review', review: review
                json.user do
                    json.partial! 'api/users/user', user: review.user
                end
            end
        end
    end
end