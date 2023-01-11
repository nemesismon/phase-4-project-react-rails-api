class PunchItemsController < ApplicationController

    # check for existing session
    # implement filters where applicable

    def create
        # collection method
        user = User.find_by(id: session[:user_id])
        if user
            item = user.punch_items.create(punch_item_params)
            render json: item, status: :accepted
        else
            render json: {error: "Unprocessible"}, status: :unprocessible_entity
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        if user
        # itemFound.errors.full_messages
            itemFound = user.punch_items.find_by(id: params[:id])
            # byebug
            noBlankParams = punch_item_params.compact_blank
            itemFound.update(noBlankParams)
            render json: itemFound, status: :accepted
        else
            render json: {error: "Not found"}, status: :not_found
        end
    end
    
    def destroy
        user = User.find_by(id: session[:user_id])
        if user
            item = PunchItem.find_by(id: params[:id])
            item.delete
            head :no_content
        else
            render json: {error: "Record not found"}, status: :not_found
        end
    end

    private
    # Make strong params as universal as possible with regard to controller functions, less is more **The More You Know...**.....
    def punch_item_params
        params.require(:punch_item).permit(:id, :user_id, :project_id, :task, :area, :notes, :complete_by, :active)
    end

end
