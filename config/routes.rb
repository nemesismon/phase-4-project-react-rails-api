Rails.application.routes.draw do
  
  resources :projects, only: [:index, :create]
  resources :punch_items, only: [:create, :show, :update, :destroy]
  resources :users, only: [:create, :show]

  get '/me', to: 'sessions#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end