json.extract! business, :id, :name, :address, :city, :state, :zip_code, :lat, :lng, :open, :close, :category, :price, :phone_number, :website, :country, :created_at, :updated_at
json.photoUrls do
    json.array! business.photos, :url
end
