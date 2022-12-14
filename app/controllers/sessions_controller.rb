class SessionsController < ApplicationController

    # check for existing session
    # implement filters where applicable

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {error: "Invalid username and/or password"}, status: :unauthorized
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {error: "Unauthorized"}, status: :unauthorized
        end
    end

    # Has to delete from database for realsies
    def destroy
        user = User.find_by(id: session[:user_id])
        if user
            session.destroy
            head :no_content
        else
            render json: {error: "No record found"}, status: :not_found
        end
    end
end
