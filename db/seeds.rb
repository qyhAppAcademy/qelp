# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  %w(users).each do |table_name|
    ApplicationRecord.connection.reset_pk_sequence!(table_name)
  end

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'demo', 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  users = 10.times.map do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  puts "Creating businesses..."

  Business.create!(
    name: 'Patisserie Fouet', 
    address: '15 E 13th St', 
    city: 'New York',
    state: 'NY',
    zip_code: '10003',
    lat: 40.73519603396201,
    lng: -73.9930646316334,
    open: '10:00AM EST',
    close: '08:00PM EST',
    category: 'Coffee & Tea, Desserts, Wine Bars',
    price: '$$',
    phone_number: '(212) 620-0622',
    website: 'https://www.fouetnyc.com'
  )

  puts "Done!"
end
