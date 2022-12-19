class PunchItemsController < ApplicationController

    def index
        punchItems = PunchItem.all
        if punchItems
            render json: punchItems, status: :accepted
        else
            render json: {error: "No record found"}, status: :not_found
        end
    end

    def create
        item = PunchItem.create(user_id: params[:user_id], project_id: params[:project_id], task: params[:task], area: params[:area], notes: params[:notes], complete_by: params[:complete_by], active: params[:active])
        if item
            item.save
            user = User.find_by(id: params[:user_id])
            render json: user, status: :accepted
        else
            render json: {error: "Unprocessible"}, status: :unprocessible_entity
        end
    end
    
    def destroy
        item = PunchItem.find_by(id: params[:id])
        if item
            item.update(active: false)
            user = User.find_by(id: session[:user_id])
            render json: user, status: :accepted
        else
            render json: {error: "Record not found"}, status: :not_found
        end
    end

end
