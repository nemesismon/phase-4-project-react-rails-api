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

    def show
    end

    def update
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
    # Make strong params as universal as possible with regard to controller functions, less is more
    def punch_item_params
        params.permit(:project_id, :task, :area, :notes, :complete_by, :active)
    end

end
