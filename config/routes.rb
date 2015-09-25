Rails.application.routes.draw do
  namespace :api, default: { format: :json } do
    resources :todos, except: [:new, :edit]
  end
end
