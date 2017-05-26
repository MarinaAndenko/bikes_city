class Api::RentalsController < ApplicationController
  def new
    bike_types = Bike.avaliable_types.map { |type| type.capitalize }
    addresses = Address.point_names
    render json: { bike_types: bike_types, addresses: addresses }
  end

  def check_bike
    address_bikes = Address.find_by(id: params[:address])&.avaliable_bikes
    bike = address_bikes.public_send(params[:type].underscore).first
    unless bike
      render json: { error_message: 'No free bikes for current address' }, status: 422
    end
  end

  def create
    address_bikes = Address.find_by(id: params[:address])&.avaliable_bikes
    bike = address_bikes.public_send(params[:type].underscore).first
    payment_params = params[:payment]
    payment = Payment.new(
      card_holder: payment_params[:card_holder], card_number: payment_params[:card_number],
      expiration_date: payment_params[:expiration_date], security_code: payment_params[:security_code]
    )
    if payment.valid?
      bike.update(address: nil)
      rental = Rental.create(user: User.first, bike: bike, start_time: Time.now, sum: Rental.set_correct_sum)
      render json: { bike_identifier: bike.identifier, sum: rental.sum }
    else
      render json: { errors: payment.errors }, status: 422
    end
  end
end
