class PunchItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :project_id, :task, :area, :notes, :complete_by, :completed_date, :days_to_complete, :active
end
