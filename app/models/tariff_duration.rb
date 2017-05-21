class TariffDuration < ApplicationRecord
  validates :start_point, :end_point, presence: true, numericality: true, inclusion: 0..12
  validates :price, presence: true, numericality: true, format: { with: /\A\d+(?:\.\d{0,2})?\z/ }

  belongs_to :tariff
end
