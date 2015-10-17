Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV["OMNIAUTH_FB_KEY"], ENV["OMNIAUTH_FB_SECRET"]
  provider :github, ENV["OMNIAUTH_GH_KEY"], ENV["OMNIAUTH_GH_SECRET"]
end
