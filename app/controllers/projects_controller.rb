class ProjectsController < ApplicationController

    def index
        projects = Project.all
        if projects
            render json: projects, status: :ok
        else
            render json: {error: "No record(s) found"}, status: :not_found
        end
    end

    def create
        project = Project.new(create_params)
        if project.valid?
            project.save
            projects = Project.all
            render json: projects, status: :accepted
        else
            render json: {errors: project.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def create_params
        params.permit(:title, :address, :owner_name, :complete_by)
    end

end
