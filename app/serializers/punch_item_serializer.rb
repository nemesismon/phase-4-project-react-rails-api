class PunchItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :project_id, :task, :area, :notes, :complete_by, :completed_date, :active

  belongs_to :user
  belongs_to :project
end
