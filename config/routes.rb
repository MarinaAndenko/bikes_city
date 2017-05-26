Rails.application.routes.draw do
  root to: 'welcome#index'
  
  resources :rentals, only: :new
  resources :tariffs, only: :index
  resources :user_tariffs

  namespace :admin do
    resources :bikes, only: :index
    resources :tariffs, only: :index
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
    end
  end
end
