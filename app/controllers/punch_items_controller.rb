class PunchItemsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    
    def create
        user = User.find_by(id: session[:user_id])
        if user
            item = user.punch_items.create!(punch_item_params)
            render json: item, status: :accepted
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        if user
            itemFound = user.punch_items.find_by(id: params[:id])
            noBlankParams = punch_item_params.compact_blank
            itemFound.update!(noBlankParams)
            # byebug
            render json: itemFound, status: :accepted
        end
    end
    
    def destroy
        user = User.find_by(id: session[:user_id])
        if user
            item = PunchItem.find_by!(id: params[:id])
            item.delete
            head :no_content
        end
    end

    private
    def punch_item_params
        params.permit(:id, :user_id, :project_id, :task, :area, :notes, :complete_by, :active)
    end

    def render_record_not_found
        render json: { error: 'Record nt found.'}, status: :not_found
    end

    def render_unprocessable_entity
        render json: {error: 'Incorrect or insufficient data.'}, status: :unprocessable_entity
    end

end
