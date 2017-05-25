class User < ApplicationRecord
  USER_TYPES = { admin: 1, client: 2 }.freeze

  has_many :user_tariffs
  has_many :tariffs, through: :user_tariffs
  has_many :rentals
  has_many :payments

  enum user_type: USER_TYPES

  # def current_tariff
  #   if user.user_tariffs.empty?
  #     if user.rentals.
  #   end
  # end
end
