json.user do
    json.partial! '/api/users/user', user: @user

    @user.reviews.includes(:business).each do |review|
        json.reviews do
            json.set! review.id do
                json.partial! 'api/reviews/review', review: review
                json.business do
                    json.partial! 'api/businesses/business', business: review.business
                end
            end
        end
    end
end