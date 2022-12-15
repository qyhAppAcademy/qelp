class Api::ReviewsController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]
    wrap_parameters include: Review.attribute_names + [:businessId]

    def index
        @reviews = Review.all
        render 'api/reviews/index'
    end

    def create
        @review = current_user.reviews.new(review_params)

        if @review.save
            @business = @review.business
            render 'api/businesses/show'
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @review = current_user.reviews.find(params[:id])
        
        if @review.update(review_params)
            @business = @review.business
            render 'api/businesses/show'
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @review = current_user.reviews.find(params[:id])

        unless @review
            render json: { message: 'Unauthorized' }, status: :unauthorized
            return
        end

        @business = @review.business
        @review.destroy
        render 'api/businesses/show'
    end

    private

    def review_params
        params.require(:review).permit(:rating, :body, :business_id)
    end
end
