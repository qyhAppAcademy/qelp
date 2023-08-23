class Api::BusinessesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: :geocode

    def index 
        @businesses = Business.all
        render 'api/businesses/index'
    end

    def geocode
        # @businesses = Business.find(params[:lat], params[:lng])
        # @latFloor = params[:lat] - 0.016
        # @latCeiling = params[:lat] + 0.016
        @businesses = Business
            .where(lat: params[:lat].to_d)
            # .where(lng: [params[:lng].to_d - 0.016, params[:lng].to_d + 0.016])
            # .limit(3)
        # @businesses = Business.all
        render 'api/businesses/index'
        # render plain: params[:lat].to_d
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