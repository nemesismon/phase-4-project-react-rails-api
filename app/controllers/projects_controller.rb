class ProjectsController < ApplicationController

    # check for existing session
    # implement filters where applicable

    def index
        user = User.find_by(id: session[:user_id])
                # needs to check user type, display all for General Contractor - subs only on their respective projects
            if user
                if user.trade_type == "General Contractor"
                    # iterate over the projects and then the users to filter
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
