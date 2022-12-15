json.reviews do
  @reviews.each do |review|
    json.set! review.id do
        json.partial! 'api/reviews/review', review: review
        json.user do
            json.extract! review.user, :email
        end
        json.business do
            json.extract! review.business, :id, :name
        end
    end
  end
end