Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  resources :bikes
  resources :addresses
  resources :locations
  resources :payments
  resources :rentals
  resources :tariffs
  resources :user_tariffs

  namespace :api do
    resources :bikes
    resources :addresses
    resources :locations
    resources :payments
    resources :rentals
    resources :tariffs
    resources :user_tariffs
  end
end
