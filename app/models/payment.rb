class Payment < ApplicationRecord
  belongs_to :user

  validates :card_holder, format: { with: /\A^[a-zA-Z]*$\Z/ }
  validates :card_number, format: { with: /\A[0-9]{16}\Z/ }
  validates :security_code, format: { with: /\A[0-9]{4}\Z/ }

  # def card_number_validation
  #   detector = CreditCardValidations::Detector.new(card_number)
  #   unless detector.valid?(:mastercard, :maestro, :visa)
  #     errors.add(:card_number)
  #   end
  # end
end
