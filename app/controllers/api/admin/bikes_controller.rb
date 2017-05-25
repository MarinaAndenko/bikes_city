class Api::Admin::BikesController < ApplicationController
  before_action :bikes_list, except: [:new, :edit]

  def index
    render json: bikes_list
  end

  def filter
    render json: bikes_list.where("identifier ILIKE ?", "%#{params[:pattern]}%")
  end

  def new
    render json: { identifier: Bike.generate_identifier, address: addresses_list }
  end

  def create
    Bike.create(bike_params)
    # binding.pry
    render json: bikes_list
  end

  def edit
    bike = Bike.find(params[:id]).select(:id, :identifier, :start_date, :biky_type)
    render json: { bike: bike, address: addresses_list }
  end

  def update
    Bike.update(bike_params)
    render json: bikes_list
  end

  def destroy
    Bike.find(params[:id]).destroy
    render json: bikes_list
  end

  private

  def bikes_list
    Bike.table_list
  end

  def addresses_list
    Address.pluck(:full_address)
  end

  def bike_params
    address = Address.find_by(full_address: params[:address]).id
    params(:identifier, :start_date, :bike_type).merge(address_id: address)
  end
end
