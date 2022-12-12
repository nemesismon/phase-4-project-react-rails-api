class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :company_name, :address, :trade_type, :point_of_contact, :phone, :email

  has_many :punch_items
  has_many :projects, through: :punch_items
end
