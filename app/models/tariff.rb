class Tariff < ApplicationRecord
  TARIFF_TYPES = { day: 1, month: 2, season: 3 }.freeze

  validates :tariff_type, presence: true

  has_many :tariff_durations
  has_many :user_tariffs
  has_many :users, through: :user_tariffs

  enum tariff_type: TARIFF_TYPES

  def self.view_variants
    tariffs = {}
    TARIFF_TYPES.keys.map do |type|
      tariffs[type] = Tariff.public_send(type).joins(:tariff_durations).select(
        'tariff_durations.start_point, tariff_durations.end_point, tariff_durations.price'
      )
    end
    tariffs
  end
end
