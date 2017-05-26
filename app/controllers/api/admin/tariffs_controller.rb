class Api::Admin::TariffsController < ApplicationController
  def index
    render json: tariffs
  end

  def create
    Tariff.public_send(params[:type]).first.tariff_durations.create(tariff_duration_params)
    render json: tariffs
  end

  def edit
    tariff = TariffDuration.find(params[:id]).select(:id, :start_point, :end_point, :price)
    render json: { tariff_duration: tariff }
  end

  def update
    TariffDuration.find(params[:id]).update(tariff_duration_params)
    render json: tariffs
  end

  def destroy
    TariffDuration.find(params[:id]).destroy
    render json: tariffs
  end

  private

  def tariff_duration_params
    params.require(:tariff_duration).permit(:start_point, :end_point, :price)
  end

  def tariffs
    {
      day_tariffs: TariffDuration.day_tariffs,
      month_tariffs: TariffDuration.month_tariffs,
      season_tariffs: TariffDuration.season_tariffs
    }
  end
end
