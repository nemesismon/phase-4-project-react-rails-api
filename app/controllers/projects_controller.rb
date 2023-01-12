class ProjectsController < ApplicationController

    def index
        user = User.find_by(id: session[:user_id])
            if user
                if user.trade_type == "General Contractor"
                    projects = Project.all
                    render json: projects, status: :ok
                else
                    render json: user.projects, status: :ok
                end
            else
                render json: {error: "Unauthorized"}, status: :unauthorized
            end
    end

    def create
        user = User.find_by(id: session[:user_id])
        project = Project.new(project_params)
        if project.valid? && user
            project.save
            projects = Project.all
            render json: projects, status: :accepted
        else
            render json: {errors: project.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def project_params
        params.permit(:title, :address, :owner_name, :complete_by)
    end

end
