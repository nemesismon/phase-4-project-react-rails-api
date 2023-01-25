class PunchItem < ApplicationRecord
    belongs_to :user
    belongs_to :project

    validates :task, on: :create, presence: true, length: {minimum: 3}
    validates :area, on: :create, presence: true, length: {minimum: 3}
    validates :notes, on: :create, presence: true, length: {minimum: 3}
    validates :complete_by, on: :create, presence: true

    validates :task, on: :update, allow_blank: true, length: {minimum: 3}
    validates :area, on: :update, allow_blank: true, length: {minimum: 3}
    validates :notes, on: :update, allow_blank: true, length: {minimum: 3}
end
