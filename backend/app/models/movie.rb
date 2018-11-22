class Movie < ApplicationRecord
  validates :movieName, :director_id, :releaseDate, presence: true
  belongs_to :director

  def releaseYear
    releaseDate.year if releaseDate
  end

  def directorName
    director.name
  end

  def as_json(options = {})
    super(
      :only => [:id, :movieName, :releaseDate],
      :methods => [:directorName, :releaseYear]
    )
  end
end
