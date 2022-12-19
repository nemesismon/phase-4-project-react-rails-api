class Project < ApplicationRecord
    has_many :punch_items
    has_many :users, through: :punch_items

    validates :title, presence: true, length: {minimum: 3}
    validates :address, presence: true
    validates :owner_name, presence: true, length: {minimum: 3}
    validates :complete_by, presence: true
end