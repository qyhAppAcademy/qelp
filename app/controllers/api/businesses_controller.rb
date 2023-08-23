class Api::BusinessesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: :geocode

    def index 
        @businesses = Business.all
        render 'api/businesses/index'
    end

    def geocode
        @offset = 0.016
        @businesses = Business
            .where(lat: (params[:lat].to_d - @offset)..(params[:lat].to_d + @offset))
            .where(lng: (params[:lng].to_d - @offset)..(params[:lng].to_d + @offset))
            .limit(3)
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