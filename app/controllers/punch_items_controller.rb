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
        item = PunchItem.create(user_id: params[:user_id], project_id: params[:project_id], task: params[:task], area: params[:area], notes: params[:notes], complete_by: params[:complete_by])
        if item
            item.save
            render json: item, status: :accepted
        else
            render json: {error: "Unprocessible"}, status: :unprocessible_entity
        end
    end



end
