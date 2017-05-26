Tariff::TARIFF_TYPES.keys.each { |i| Tariff.create(tariff_type: i) }

tariff_day = Tariff.day.first
TariffDuration.create(tariff: tariff_day, start_point: 0, end_point: 1, price: 50.0)
TariffDuration.create(tariff: tariff_day, start_point: 2, end_point: 2, price: 40.0)
TariffDuration.create(tariff: tariff_day, start_point: 3, end_point: 3, price: 30.0)

tariff_month = Tariff.month.first
TariffDuration.create(tariff: tariff_month, start_point: 0, end_point: 1, price: 300.0)
TariffDuration.create(tariff: tariff_month, start_point: 2, end_point: 2, price: 250.0)
TariffDuration.create(tariff: tariff_month, start_point: 3, end_point: 12, price: 200.0)

season_tariff = Tariff.season.first
TariffDuration.create(tariff: season_tariff, start_point: 3, end_point: 5, price: 750.0)
TariffDuration.create(tariff: season_tariff, start_point: 6, end_point: 8, price: 600.0)
TariffDuration.create(tariff: season_tariff, start_point: 9, end_point: 11, price: 750.0)

5.times { Address.create(full_address: Faker::Address.street_address) }

(1..30).map { Bike.generate_identifier }.each_with_index do |i, k|
  blocked = rand(1..5) == rand(1..5)
  stolen = rand(1..7) == rand(1..7)
  Bike.create(
    identifier: i, bike_type: rand(1..4), address: Address.all.sample,
    start_date: k.days.ago, blocked: blocked, stolen: stolen
  )
end

[:client, :admin].each do |u_type|
  User.create(
    first_name: Faker::Name.first_name, last_name: Faker::Name.last_name,
    email: Faker::Internet.email, birthdate: Faker::Date.birthday(18, 50),
    user_type: u_type
  )
end

15.times { |i| Rental.create(user: User.client.first, bike: Bike.find(i + rand(1..15)), sum: 50.0) }
