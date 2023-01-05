class Project < ApplicationRecord
    has_many :punch_items
    has_many :users, -> { distinct }, through: :punch_items


    validates :title, presence: true, length: {minimum: 3}
    validates :address, presence: true, length: {minimum: 7}
    validates :owner_name, presence: true, length: {minimum: 3}
    # check for type date
    validates :complete_by, presence: true
end