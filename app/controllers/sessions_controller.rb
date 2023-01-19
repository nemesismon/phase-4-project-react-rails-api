class SessionsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    before_action :find_user, only: [:show, :destroy]

    def create
        user = User.find_by!(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        end
    end

    def show
        render json: @user, status: :ok
    end

    def destroy
        session.destroy
        head :no_content
    end


    private

    def find_user
        @user = User.find_by!(id: session[:user_id])
    end

    def render_record_not_found
        render json: { error: 'Record not found.'}, status: :not_found
    end

    def render_unprocessable_entity
        render json: {error: 'Incorrect or insufficient data.'}, status: :unprocessable_entity
    end

end
