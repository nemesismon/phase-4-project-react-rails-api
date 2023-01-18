class ProjectsController < ApplicationController

    def index
        user = User.find_by(id: session[:user_id])
            if user
                if user.trade_type == 'General Contractor'
                    projects = Project.all
                    render json: projects, status: :ok
                else
                    render json: user.projects, status: :ok
                end
            else
                render json: {error: 'Unauthorized.'}, status: :unauthorized
            end
    end

    def create
        user = User.find_by(id: session[:user_id])
        project = Project.new(project_params)
        if user&&project.valid?
            project.save
            projects = Project.all
            render json: projects, status: :accepted
        else
            render json: {error: 'Incorrect or insufficient data.'}, status: :unprocessable_entity
        end
    end

    # def search
    #     projects = Project.all.map do |project|
    #         project.punch_items.include?(search_params)
    #     end
    #     if projects
    #         render json: projects, include: punch_items, status: :ok
    #     else
    #         render json: {messgage: 'No projects found'}, status: :not_found
    #     end
    # end

    private

    def project_params
        params.permit(:title, :address, :owner_name, :complete_by)
    end

    # def search_params
    #     params.permit(:search_term)
    # end

end
