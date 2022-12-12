json.extract! business, :id, :name, :address, :city, :state, :zip_code, :lat, :lng, :open, :close, :category, :price, :phone_number, :website, :created_at, :updated_at
# json.photoUrl url_for(business.photo)
# json.photoUrl business.photo.url
json.photoUrls do
    json.array! business.photos, :url
end
