Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:create]
    resources :businesses, only: [:index, :show]
    resources :reviews, only: [:create, :update, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
  
end
