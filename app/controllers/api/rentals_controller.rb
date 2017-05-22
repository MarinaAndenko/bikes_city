class Api::RentalsController < ApplicationController
  def new
    bike_types = Bike.avaliable_types.map { |type| type.capitalize }
    addresses = Address.point_names
    render json: { bike_types: bike_types, addresses: addresses }
  end

  def check_bike
    address_bikes = Address.find_by(id: params[:address])&.bikes
    bike = address_bikes.public_send(params[:type].underscore).first
    unless bike
      render json: { error_message: 'No free bikes for current address' }, status: 422
    end
  end

  def create
    address_bikes = Address.find_by(id: params[:address]).bikes
    bike = address_bikes.public_send(params[:type].underscore).first
    payment = Payment.new(payment_params)
    # binding.pry
    if payment.save
      bike.update(address: nil)
      Rental.create(user: User.first, bike: bike, start_time: Time.now)
      render json: { bike_identifier: bike.identifier }
    else
      render json: {
        errors: {
          card_holder: payment.errors[:card_holder].first,
          card_number: payment.errors[:card_number].first,
          security_code: payment.errors[:security_code].first
        }
      }, status: 422
    end
  end

  def update
  end

  def destroy
  end

  private

  def payment_params
    params.require(:payment).permit(:card_holder, :card_number, :expiration_date, :security_code).merge(user: User.first)
  end
end
