# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170521124942) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string   "point_name"
    t.text     "full_address"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "bikes", force: :cascade do |t|
    t.string   "identifier"
    t.integer  "bike_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "address_id"
    t.index ["address_id"], name: "index_bikes_on_address_id", using: :btree
  end

  create_table "payments", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "card_holder"
    t.string   "card_number"
    t.date     "expiration_date"
    t.string   "security_code"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.float    "sum"
    t.boolean  "confirmed",       default: false
    t.index ["user_id"], name: "index_payments_on_user_id", using: :btree
  end

  create_table "rentals", force: :cascade do |t|
    t.integer  "bike_id"
    t.integer  "user_id"
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bike_id"], name: "index_rentals_on_bike_id", using: :btree
    t.index ["user_id"], name: "index_rentals_on_user_id", using: :btree
  end

  create_table "tariff_durations", force: :cascade do |t|
    t.integer  "tariff_id"
    t.integer  "start_point"
    t.integer  "end_point"
    t.float    "price"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["tariff_id"], name: "index_tariff_durations_on_tariff_id", using: :btree
  end

  create_table "tariffs", force: :cascade do |t|
    t.integer  "tariff_type"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "user_tariffs", force: :cascade do |t|
    t.integer  "tariff_id"
    t.integer  "user_id"
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tariff_id"], name: "index_user_tariffs_on_tariff_id", using: :btree
    t.index ["user_id"], name: "index_user_tariffs_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "phone_number"
    t.date     "birthdate"
    t.integer  "user_type"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_foreign_key "bikes", "addresses"
  add_foreign_key "payments", "users"
  add_foreign_key "rentals", "bikes"
  add_foreign_key "rentals", "users"
  add_foreign_key "tariff_durations", "tariffs"
  add_foreign_key "user_tariffs", "tariffs"
  add_foreign_key "user_tariffs", "users"
end
