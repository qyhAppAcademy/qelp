class Api::BusinessesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: :query

    def index
        @businesses = Business.all
        render 'api/businesses/index'
    end

    def query
        address = params[:address]
        if !address[:geo].nil?
            lat = address[:geo][:lat].to_d
            lng = address[:geo][:lng].to_d
            offset = 0.016
            limit = 10
            @businesses = Business
                .where(lat: (lat - offset)..(lat + offset))
                .where(lng: (lng - offset)..(lng + offset))
                .limit(limit)
        else
            @businesses = Business.all
        end
        puts params
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