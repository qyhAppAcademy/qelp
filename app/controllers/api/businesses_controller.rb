class Api::BusinessesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: :index_by_address

    def index
        @businesses = Business.all
        render 'api/businesses/index'
    end

    def index_by_address
        if params.include?(:lat) and !params[:lat].nil? and params[:lat] != 0 and
            params.include?(:lng) and !params[:lng].nil? and params[:lng] != 0
            offset = 0.016
            limit = 10
            @businesses = Business
                .where(lat: (params[:lat].to_d - offset)..(params[:lat].to_d + offset))
                .where(lng: (params[:lng].to_d - offset)..(params[:lng].to_d + offset))
                .limit(limit)
        else
            @businesses = Business.all
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