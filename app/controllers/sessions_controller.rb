class SessionsController < ApplicationController
    session[:user_id] ||= nil
end
