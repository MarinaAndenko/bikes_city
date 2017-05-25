class Bike < ApplicationRecord
  BIKE_TYPES = { man: 1, woman: 2, boy: 3, girl: 4 }.freeze

  belongs_to :address
  has_many :rentals

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

  def self.table_list
    Bike.left_outer_joins(:rentals, :address).select(
      'bikes.id, identifier, start_date, bike_type, address_id, addresses.full_address as full_address, stolen, blocked, count(rentals.*) as rentals_count'
    ).group('bikes.id, identifier, start_date, address_id, full_address, stolen, blocked').order(created_at: :desc)
  end
end
