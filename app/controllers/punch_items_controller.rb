class PunchItemsController < ApplicationController

    def index
        punchItems = PunchItem.all
        if punchItems
            render json: punchItems, status: :accepted
        else
            render json: {"Not record"}
        end
    end

end
