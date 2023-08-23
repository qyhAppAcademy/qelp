class Api::BusinessesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: :geocode

    def index 
        @businesses = Business.all
        render 'api/businesses/index'
    end

    def geocode
        # @businesses = Business.find(params[:lat], params[:lng])
        # @businesses = Business
        #     .where(lat: [params[:lat] - 0.016, params[:lat] + 0.016])
        #     .where(lng: [params[:lng] - 0.016, params[:lng] + 0.016])
        #     .limit(3)
        @businesses = Business.all
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