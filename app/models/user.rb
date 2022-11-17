class User < ApplicationRecord
    has_secure_password

    has_many :punch_items
    has_many :projects, through :punch_items
end
