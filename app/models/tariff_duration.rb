class TariffDuration < ApplicationRecord
  validates :start_point, :end_point, presence: true, numericality: true, inclusion: 0..12
  validates :price, presence: true, numericality: true, format: { with: /\A\d+(?:\.\d{0,2})?\z/ }

  belongs_to :tariff

  scope :day_tariffs, -> { where(tariff: Tariff.day.first).select(:id, :start_point, :end_point, :price) }
  scope :month_tariffs, -> { where(tariff: Tariff.month.first).select(:id, :start_point, :end_point, :price) }
  scope :season_tariffs, -> { where(tariff: Tariff.season.first).select(:id, :start_point, :end_point, :price) }

  scope :first_rental, -> { find_by(start_point: 1) }
end
