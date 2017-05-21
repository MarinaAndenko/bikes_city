class Api::TariffsController < ApplicationController
  def index
    render json: Tariff.view_variants
  end

  def create
  end

  def update
  end

  def destroy
  end
end