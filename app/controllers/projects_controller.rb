class ProjectsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    before_action :find_user

    def index
        user = User.find_by!(id: session[:user_id])
        if user.trade_type == 'General Contractor'
            projects = Project.all
            render json: projects, status: :ok
        else 
            projects = user.projects
            render json: projects, status: :ok
        end
    end

    def create
        project = Project.new(project_params)
        if project.valid?
            project.save!
            projects = Project.all
            render json: projects, status: :accepted
        else
            render json: {error: 'Unprocessable entity'}, status: :unprocessable_entity
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

    def find_user
        @user = User.find_by!(id: session[:user_id])
    end

    def project_params
        params.permit(:title, :address, :owner_name, :complete_by)
    end

    # def search_params
    #     params.permit(:search_term)
    # end

end
