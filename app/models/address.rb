class Address < ApplicationRecord
  has_many :bikes

  validates :full_address, presence: true

  scope :point_names, -> { select(:id, :full_address) }
end
