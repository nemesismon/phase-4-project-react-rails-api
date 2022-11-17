class User < ApplicationRecord
    has_secure_password

    has_many :punch_items
    has_many :projects, through: :punch_items

    validates :username, length: {minimum: 5}
    validates :company_name, length: {minimum: 3}
    validates :address, presence: true #better way?
    validates :trade_type, length: {minimum: 3}
    validates :point_of_contact, length: {minimum: 5}
    validates :phone, length: {is: 10}
    validates :email, email: true
end
