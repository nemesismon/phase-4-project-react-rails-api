class User < ApplicationRecord
    has_secure_password

    has_many :punch_items
    has_many :projects, -> { distinct }, through: :punch_items

    validates :username, length: {minimum: 5}, uniqueness: true
    validates :company_name, length: {minimum: 3}
    validates :address, presence: true #better way?
    validates :trade_type, presence: true
    validates :point_of_contact, length: {minimum: 2}
    validates :phone, length: {is: 10}, numericality: { only_integer: true }
    validates :email, email: true, uniqueness: true
end
