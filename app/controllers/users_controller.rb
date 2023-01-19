class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def create
        user = User.new(create_params)
        if user.valid?
            user.save!
            session[:user_id] = user.id
            render json: user, status: :created 
        end
    end

    def index
        users = User.all
        if users!
            render json: users, status: :ok
        else
            render json: {error: 'No record found.'}, status: :not_found
        end
    end

    def show
        user = User.find_by!(id: session[:user_id])
        render json: user, status: :ok
    end


    private

    def create_params
        params.permit(:username, :password, :password_confirmation, :company_name, :address, :trade_type, :point_of_contact, :phone, :email)
    end

    def render_record_not_found
        render json: { error: 'Record not found.'}, status: :not_found
    end

    def render_unprocessable_entity
        render json: {error: 'Incorrect or insufficient data.'}, status: :unprocessable_entity
    end

end
