Rails.application.routes.draw do
  root to: "static_pages#root"

  get 'auth/:provider/callback', to: "sessions#create"
  delete 'sign_out', to: "sessions#destroy", as: 'sign_out'

  namespace :api, default: { format: :json } do
    resources :todos, except: [:new, :edit]
  end
end
