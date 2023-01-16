class PunchItem < ApplicationRecord
    belongs_to :user
    belongs_to :project

    # validates :task, presence: true, length: {minimum: 3}, on: :create
    # validates :area, presence: true, length: {minimum: 3}, on: :create
    # validates :notes, presence: true, length: {minimum: 3}, on: :create
    # validates :complete_by, presence: true, on: :create

    validates :task, allow_blank: true, length: {minimum: 3}
    validates :area, allow_blank: true, length: {minimum: 3}
    validates :notes, allow_blank: true, length: {minimum: 3}
    # validates :complete_by, allow_blank: true, on: :update
end
