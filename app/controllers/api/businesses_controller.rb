class Api::BusinessesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: :query

    def query
        keyword = params[:keyword]
        address = params[:address]
        limit = 10
        if !address[:geo].nil?
            lat = address[:geo][:lat]
            lng = address[:geo][:lng]
            offset = 0.032
            @businesses =
            Business.where(lat: (lat - offset)..(lat + offset))
                    .where(lng: (lng - offset)..(lng + offset))
                    .and(
            Business.where("LOWER(name) LIKE ?", "%" + keyword + "%")
                    .or(
            Business.where("LOWER(category) LIKE ?", "%" + keyword + "%")))
                    .limit(limit)
        else
            @businesses = 
            Business.where("LOWER(name) LIKE ?", "%" + keyword + "%")
                    .or(
            Business.where("LOWER(category) LIKE ?", "%" + keyword + "%"))
                    .limit(limit)
        end
        render 'api/businesses/index'
    end

    def show
        @business = Business.find(params[:id])
        if @business
            render 'api/businesses/show'
        else
            render json: @business.errors.full_messages, status: 404
        end
    end
end