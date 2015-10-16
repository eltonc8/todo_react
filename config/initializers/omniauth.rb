Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, Rails.application.secrets.omniauth_fb_key, Rails.application.secrets.omniauth_fb_secret
  provider :github, Rails.application.secrets.omniauth_gh_key, Rails.application.secrets.omniauth_gh_secret
end
