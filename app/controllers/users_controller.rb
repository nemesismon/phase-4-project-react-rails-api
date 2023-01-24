class UsersController < ApplicationController

    def create
        user = User.new(create_params)
        if user.valid?
            user.save!
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def show
        user = User.find_by!(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {errors: 'Unauthorized'}, status: :not_found
        end
    end


    private

    def create_params
        params.permit(:username, :password, :password_confirmation, :company_name, :address, :trade_type, :point_of_contact, :phone, :email)
    end

end
