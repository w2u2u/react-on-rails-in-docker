# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10.times do
  Director.create(:name => Faker::Name.name)
end

100.times do
  Movie.create(
    :movieName => Faker::Book.title,
    :director_id => 1 + Random.rand(10),
    :releaseDate => Faker::Date.between(20.years.ago, Date.today),
  )
end