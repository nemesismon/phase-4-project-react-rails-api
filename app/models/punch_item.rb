class PunchItem < ApplicationRecord
    belongs_to :user
    belongs_to :project

    validates :task, presence: true, length: {minimum: 3}
    validates :area, presence: true, length: {minimum: 3}
    validates :notes, presence: true, length: {minimum: 3}
    validates :complete_by, presence: true
end
