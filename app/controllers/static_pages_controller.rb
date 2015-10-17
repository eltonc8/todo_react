class StaticPagesController < ApplicationController
  before_action :set_auth

  def root
    render "static_pages/root"
  end

  private
  def set_auth
    @auth = session[:omniauth] if session[:omniauth]
  end
end
