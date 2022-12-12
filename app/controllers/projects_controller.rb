class ProjectsController < ApplicationController

    def index
        projects = Project.all
        if projects
            render json: projects, status: :ok
        else
            render json: {error: "No record(s) found"}
        end
    end

    def create
    end

end
