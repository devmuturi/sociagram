Rails.application.routes.draw do
  devise_for :users, path: "", path_names: {
    sign_in: "login",
    sign_out: "logout",
    registration: "signup"
  },
  controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }

  namespace :api do
    namespace :v1 do
      resources :users, only: [ :index, :show, :update, :destroy ] do
        member do
          post :follow
          delete :unfollow
          get :posts, to: "users#user_posts"
        end
        collection do
          get :suggestions
        end
      end

      resources :posts do
        resources :comments, only: [ :create, :update, :destroy ]
        member do
          post :like
          delete :unlike
        end
        collection do
          get :newsfeed
        end
      end

      resources :follows, only: [ :create, :destroy ]
      resources :likes, only: [ :create, :destroy ]
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
