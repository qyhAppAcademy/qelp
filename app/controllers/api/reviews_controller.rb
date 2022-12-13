class Api::ReviewsController < ApplicationController
    before_action :require_logged_in
    wrap_parameters include: Review.attribute_names + [:businessId]

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
            @user = current_user
            render 'api/users/show'
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

        @review.destroy
        @user = current_user
        render 'api/users/show'
    end

    private

    def review_params
        params.require(:review).permit(:rating, :body, :business_id)
    end
end
