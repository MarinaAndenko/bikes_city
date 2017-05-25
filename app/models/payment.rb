class Payment
  attr_accessor :card_holder, :card_number, :security_code

  validates :card_holder, format: { with: /\A^[a-zA-Z]*$\Z/ }
  validates :card_number, format: { with: /\A[0-9]{16}\Z/ }
  validates :security_code, format: { with: /\A[0-9]{4}\Z/ }
end
