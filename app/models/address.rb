class Address < ApplicationRecord
  has_many :bikes

  validates :full_address, presence: true

  scope :point_names, -> { select(:id, :full_address) }

  def avaliable_bikes
    bikes.where('bikes.blocked = ? and bikes.stolen = ?', false, false)
  end
end
