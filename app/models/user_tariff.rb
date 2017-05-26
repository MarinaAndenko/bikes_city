class UserTariff < ApplicationRecord
  belongs_to :user
  belongs_to :tariff_duration
end
