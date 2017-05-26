class Payment
  def initialize(card_holder: nil, card_number: nil, expiration_date: nil, security_code: nil)
    @card_holder = card_holder
    @card_number = card_number
    @expiration_date = expiration_date.to_date
    @security_code = security_code
  end

  def valid?
    card_holder_valid? && card_number_valid? && expiration_date_valid? && security_code_valid?
  end

  def errors
    {
      card_holder: card_holder_error_message,
      card_number: card_number_error_message,
      expiration_date: expiration_date_error_message,
      security_code: security_code_error_message,
    }
  end

  private

  def card_holder_valid?
    @card_holder.present? && /\A^[a-zA-Z\s]*$\Z/.match?(@card_holder)
  end

  def card_number_valid?
    /\A[0-9]{16}\Z/.match?(@card_number)
  end

  def expiration_date_valid?
    @expiration_date.present? && @expiration_date > Date.today + 1.week
  end

  def security_code_valid?
    /\A[0-9]{4}\Z/.match?(@security_code)
  end

  def card_holder_error_message
    "Must corresponds to 'Name Surname'" unless card_holder_valid?
  end

  def card_number_error_message
    'Is invalid' unless card_number_valid?
  end

  def expiration_date_error_message
    'Must have a week in margin' unless expiration_date_valid?
  end

  def security_code_error_message
    'Is invalid' unless security_code_valid?
  end
end
