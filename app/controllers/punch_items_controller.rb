class PunchItemsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound => notFound, with: :render_record_not_found
    rescue_from ActiveRecord::RecordInvalid => invalid, with: :render_unprocessable_entity

    before_action :find_user
    
    def create
        item = @user.punch_items.create!(punch_item_params)
        render json: item, status: :accepted
    end

    def update
        itemFound = @user.punch_items.find_by!(id: params[:id])
        noBlankParams = punch_item_params.compact_blank
        itemFound.update!(noBlankParams)
        render json: itemFound, status: :accepted
    end
    
    def destroy
        item = PunchItem.find_by!(id: params[:id])
        item.delete
        head :no_content
    end


    private

    def find_user
        @user = User.find_by!(id: session[:user_id])
    end

    def punch_item_params
        params.permit(:id, :user_id, :project_id, :task, :area, :notes, :complete_by, :active)
    end

    def render_record_not_found (notFound)
        render json: {notFound.errors.full_messages}, status: :not_found
    end

    def render_unprocessable_entity (invalid)
        render json: {invalid.errors.full_messages}, status: :unprocessable_entity
    end

end
