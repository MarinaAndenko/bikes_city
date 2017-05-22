class Bike < ApplicationRecord
  BIKE_TYPES = { man: 1, woman: 2, boy: 3, girl: 4 }.freeze

  belongs_to :address

  validates :identifier, :bike_type, presence: true

  enum bike_type: BIKE_TYPES

  scope :avaliable_types, -> { where.not(address: nil).pluck('DISTINCT bike_type') }

  def self.generate_identifier
    identifier = nil
    loop do
      identifier = Faker::Number.number(8)
      break if Bike.find_by(identifier: identifier).nil?
    end
    identifier
  end
end
