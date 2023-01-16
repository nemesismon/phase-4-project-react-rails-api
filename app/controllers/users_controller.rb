class UsersController < ApplicationController

    def create
        user = User.new(create_params)
        if user.valid?
            user.save
            session[:user_id] = user.id
            render json: user, status: :created 
        else
            render json: {error: 'Incorrect or insufficient data.'}, status: :unprocessable_entity
        end
    end

    def index
        users = User.all
        if users
            render json: users, status: :ok
        else
            render json: {error: 'No record found.'}, status: :not_found
        end
    end

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user, status: :ok
        else
            render json: {error: 'No record found.'}, status: :not_found
        end
    end

    private

    def create_params
        params.permit(:username, :password, :password_confirmation, :company_name, :address, :trade_type, :point_of_contact, :phone, :email)
    end

end
