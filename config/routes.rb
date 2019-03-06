Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  root 'items#index'
  resources :items do
    member do
      get 'buy'
      post 'pay'
    end
    collection do
      get 'search'
    end
  end

  match 'select_first_category', to: 'items#select_first_category', via: [:get, :post]
  match 'select_second_category', to: 'items#select_second_category', via: [:get, :post]
  match 'select_third_category', to: 'items#select_third_category', via: [:get, :post]

  get 'personal_datas/' => "personal_datas#identification"
  get 'personal_datas/method_of_payment' => "personal_datas#method_of_payment"
  get 'personal_datas/credit_card' => "personal_datas#credit_card"
  resources :users do
    collection do
      get 'profile'
      get 'mypage'
      get 'logout'
      get 'registration'
    end
  end
end
