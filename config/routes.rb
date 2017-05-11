Rails.application.routes.draw do
  resources :image_comments
  resources :images
  devise_for :users, :controllers => { registrations: 'registrations' }
  # as :user do
  #   get 'users/:id', :to => 'devise/registrations#edit', :as => :user_root
  # end
  resources :users, only: :show
  root "pages#show", page: "home"
  get "/pages/:page" => "pages#show"
  resources :likes
end
