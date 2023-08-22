json.businesses do
  @businesses.each do |business|
    json.set! business.id do
        json.partial! 'api/businesses/business', business: business
        json.avgRating business.avg_rating
        json.reviewsCount business.reviews_count
    end
  end
end