class Rental < ApplicationRecord
  belongs_to :user
  belongs_to :bike

  before_create :set_correct_sum

  private

  def set_correct_sum
  end
end
