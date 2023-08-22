class Api::BusinessesController < ApplicationController
    def index 
        @businesses = Business.all
        render 'api/businesses/index'
    end

    def find_by_geocode
        @businesses = Business.find(params[:lat], params[:lng])
        render 'api/businesses/find_by_geocode'
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