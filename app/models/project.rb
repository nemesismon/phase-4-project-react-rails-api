class Project < ApplicationRecord
    has_many :punch_items
    has_many :users, through :punch_items
end
