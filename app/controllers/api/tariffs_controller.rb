class Api::TariffsController < ApplicationController
  def index
    render json: Tariff.view_variants
  end
end