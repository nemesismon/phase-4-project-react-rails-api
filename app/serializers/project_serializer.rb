class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :address, :owner_name, :complete_by, :completed_date, :days_overdue, :active
end
