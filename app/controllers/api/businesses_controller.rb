class Api::BusinessesController < ApplicationController
    def index 
        @businesses = Business.all
        render 'api/businesses/index'
    end

    def show
        @business = Business.find(params[:id])
        # @reviews = @business.reviews
        if @business
            render 'api/businesses/show'
        else
            render json: @business.errors.full_messages, status: 404
        end
    end
end