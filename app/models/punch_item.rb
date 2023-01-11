class PunchItem < ApplicationRecord
    belongs_to :user
    belongs_to :project

    validates :task, allow_blank: true, length: {minimum: 3}
    validates :area, allow_blank: true, length: {minimum: 3}
    validates :notes, allow_blank: true, length: {minimum: 3}
    validates :complete_by, presence: true
end
