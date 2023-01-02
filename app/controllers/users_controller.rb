class UsersController < ApplicationController

    # check for existing session
    # implement filters where applicable

    def create
        user = User.new(create_params)
        if user.valid?
            user.save
            session[:user_id] = user.id
            render json: user, status: :created 
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessible_entity
        end
    end

    def index
        users = User.all
        if users
            render json: users, status: :ok
        else
            render json: {error: "No record(s) found"}, status: :not_found
        end
    end

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user, status: :ok
        else
            render json: {error: "No record found"}, status: :not_found
        end
    end

    def update
        user = User.find_by(id: params[:id])
        if user
            user.update(update_params)
            render json: user, status: :accepted
        else
            render json: {error: "No record found"}, status: :not_found
        end
    end

    private

    def create_params
        params.permit(:username, :password, :password_confirmation, :company_name, :address, :trade_type, :point_of_contact, :phone, :email)
    end

    def update_params
        params.permit(:company_name, :address, :trade_type, :point_of_contact, :phone, :email, :active)
    end

end
