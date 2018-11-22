class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :movieName
      t.date :releaseDate
      t.references :director, foreign_key: true

      t.timestamps
    end
  end
end
