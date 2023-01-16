Rails.application.routes.draw do
  
  resources :projects, only: [:index, :create]
  resources :punch_items, only: [:create, :show, :update, :destroy]
  resources :users, only: [:create, :show]

  get '/me', to: 'sessions#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/search/:search_term', to: 'projects#search'

  # 1. Create a dynamic get route that enables a search on the back end. 
  # 2. The search will look at a param (call it search_term) and looks through all the punch_items to see where that search term appears in the notes of the punch_item. 
  # 3. The action will render either json of all the projects that had punch_items that contained the search term in their notes or it will render json {message: “No projects found.”}


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end