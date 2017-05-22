class Rental < ApplicationRecord
  belongs_to :user
  belongs_to :bike

  # validates :start_time, presence: true
end
