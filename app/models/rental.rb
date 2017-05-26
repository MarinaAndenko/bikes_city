class Rental < ApplicationRecord
  belongs_to :user
  belongs_to :bike

  def self.set_correct_sum
    Tariff.day.take.tariff_durations.first_rental.price
  end
end
