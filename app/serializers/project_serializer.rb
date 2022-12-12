class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :address, :owner_name, :complete_by, :completed_date, :days_overdue, :active

  has_many :punch_items
  has_many :users, through: :punch_items
end
