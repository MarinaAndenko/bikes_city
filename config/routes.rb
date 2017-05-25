Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root to: 'hello_world#index'
  
  resources :rentals
  resources :tariffs
  resources :user_tariffs

  namespace :admin do
    resources :bikes
    resources :addresses
    resources :tariffs
  end

  namespace :api do
    resources :rentals do
      get 'check_bike', on: :collection
    end
    resources :tariffs
    resources :user_tariffs

    namespace :admin do
      resources :tariffs
      resources :bikes do
        get 'filter', on: :collection
      end
      resources :addresses
    end
  end
end
