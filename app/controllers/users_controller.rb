class UsersController < ApplicationController

    def create
        user = User.create(create_params)
        if user.valid?
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
        permit.params(:username, :password, :password_confirmation, :company_name, :address, :trade_type, :point_of_contact, :phone, :email, :active)
    end

    def update_params
        permit.params(:company_name, :address, :trade_type, :point_of_contact, :phone, :email, :active)
    end

end
