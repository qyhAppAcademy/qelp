Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:create]
    resources :businesses, only: [:index, :find_by_geocode, :show]
    resources :reviews, only: [:create, :update, :destroy, :index]
  end

  get '/api/businesses/geocode/:lat/:lng', to: 'api/businesses#geocode'

  get '*path', to: "static_pages#frontend_index"
end