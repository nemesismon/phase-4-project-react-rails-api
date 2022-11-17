class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :company_name, :address, :trade_type, :point_of_contact, :phone, :email
end
