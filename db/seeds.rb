# Tariff::TARIFF_TYPES.keys.each { |i| Tariff.create(tariff_type: i) }

tariff_day = Tariff.day.first
TariffDuration.create(tariff: tariff_day, start_point: 0, end_point: 1, price: 50.0)
TariffDuration.create(tariff: tariff_day, start_point: 1, end_point: 3, price: 40.0)
TariffDuration.create(tariff: tariff_day, start_point: 3, end_point: 5, price: 30.0)
TariffDuration.create(tariff: tariff_day, start_point: 6, end_point: 12, price: 25.0)

tariff_month = Tariff.month.first
TariffDuration.create(tariff: tariff_month, start_point: 0, end_point: 1, price: 300.0)
TariffDuration.create(tariff: tariff_month, start_point: 1, end_point: 2, price: 250.0)
TariffDuration.create(tariff: tariff_month, start_point: 3, end_point: 12, price: 200.0)

season_tariff = Tariff.season.first
TariffDuration.create(
  tariff: season_tariff, start_point: 3, end_point: 5, price: 750.0
)
TariffDuration.create(
  tariff: season_tariff, start_point: 6, end_point: 8, price: 600.0
)
TariffDuration.create(
  tariff: season_tariff, start_point: 9, end_point: 11, price: 750.0
)
