Rails.application.routes.draw do
  resources :image_comments
  resources :images
  devise_for :users, :controllers => { registrations: 'registrations' }
  resources :users, only: :show
  resources :pages, only: [:show, :index]
  root "pages#show", page: "home"
  get "/pages/:page" => "pages#show"
  resources :likes
  resources :relationships
end
