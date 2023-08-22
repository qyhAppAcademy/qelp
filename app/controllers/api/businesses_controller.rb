class Api::BusinessesController < ApplicationController
    def index 
        @businesses = Business.all
        render 'api/businesses/index'
    end

    def geocode
        # @businesses = Business.find(params[:lat], params[:lng])
        # @businesses = Business
        #     .where(lat: [40 - 0.016, 40 + 0.016])
        #     .where(lng: [70 - 0.016, 70 + 0.016])
        #     .limit(3)
        @businesses = Business.all
        render 'api/businesses/geocode'
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