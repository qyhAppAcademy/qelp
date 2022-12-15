# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# ApplicationRecord.transaction do

  require "open-uri"

  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  # Business.all.each { |business| business.photos.purge }
  Business.destroy_all

  Review.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  %w(users businesses reviews).each do |table_name|
    ApplicationRecord.connection.reset_pk_sequence!(table_name)
  end

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  u1 = User.create!(
    username: 'demo', 
    email: 'demo@user.io', 
    password: 'password'
  )

  u2 = User.create!(
    username: 'demo2', 
    email: 'demo2@user.io', 
    password: 'password'
  )

  u3 = User.create!(
    username: 'demo3', 
    email: 'demo3@user.io', 
    password: 'password'
  )

  u4 = User.create!(
    username: 'demo4', 
    email: 'demo4@user.io', 
    password: 'password'
  )

  u5 = User.create!(
    username: 'demo5', 
    email: 'demo5@user.io', 
    password: 'password'
  )

  u6 = User.create!(
    username: 'demo6', 
    email: 'demo6@user.io', 
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

  b1 = Business.create!(
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

  # r1 = Review.create!(
  #   rating: 5, 
  #   body: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.\nNo one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.\nNor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.\nTo take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?\nBut who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?", 
  #   user_id: u1.id, 
  #   business_id: b1.id)

  r2 = Review.create!(
    rating: 4, 
    body: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.\nNo one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.\nNor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.\nTo take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?\nBut who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?", 
    user_id: u2.id, 
    business_id: b1.id)

  r3 = Review.create!(
    rating: 3, 
    body: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.\nNo one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.\nNor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.\nTo take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?\nBut who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?", 
    user_id: u3.id, 
    business_id: b1.id)

  r4 = Review.create!(
    rating: 3, 
    body: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.\nNo one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.\nNor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.\nTo take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?\nBut who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?", 
    user_id: u4.id, 
    business_id: b1.id)

  r5 = Review.create!(
    rating: 2, 
    body: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.\nNo one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.\nNor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.\nTo take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?\nBut who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?", 
    user_id: u5.id, 
    business_id: b1.id)
  
  r6 = Review.create!(
    rating: 1, 
    body: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.\nNo one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.\nNor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.\nTo take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?\nBut who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?", 
    user_id: u6.id,
    business_id: b1.id)

  Business.create!(
    name: 'Vinyl Steakhouse',
    address: '35 W 19th St',
    city: 'New York',
    state: 'NY',
    zip_code: '10011',
    lat: 40.74003146596712,
    lng: -73.99308377693622,
    open: '04:00PM EST',
    close: '11:00PM EST',
    category: 'Steakhouses, Cocktail Bars',
    price: '$$$',
    phone_number: '(646) 461-7866',
    website: 'https://www.vinylsteakhouse.com'
  )

  # Business.create!(
  #   name: 'Yozi Noodles',
  #   address: '5805 8th Ave',
  #   city: 'Brooklyn',
  #   state: 'NY',
  #   zip_code: '11220',
  #   lat: 40.63635500118182,
  #   lng: -74.00840193688866,
  #   open: '11:00AM EST',
  #   close: '10:00PM EST',
  #   category: 'Chinese',
  #   price: '$$',
  #   phone_number: '(718) 633-8888',
  #   website: 'https://www.yoziducksoup.com'
  # )

  # Business.create!(
  #   name: 'MUD',
  #   address: '307 E 9th St',
  #   city: 'New York',
  #   state: 'NY',
  #   zip_code: '10003',
  #   lat: 40.72911834581734,
  #   lng: -73.98667531451746,
  #   open: '08:00AM EST',
  #   close: '12:00AM EST',
  #   category: 'Coffee & Tea, Breakfast & Brunch, Beer Bars',
  #   price: '$$',
  #   phone_number: '(212) 228-9074',
  #   website: 'https://www.mudnyc.com'
  # )

  # Business.create!(
  #   name: 'Jongro BBQ',
  #   address: '22 W 32nd St',
  #   city: 'New York',
  #   state: 'NY',
  #   zip_code: '10001',
  #   lat: 40.74759363534642,
  #   lng: -73.98691124588643,
  #   open: '11:30AM EST',
  #   close: '1:00AM EST',
  #   category: 'Korean, Barbeque, Bars',
  #   price: '$$',
  #   phone_number: '(212) 473-2233',
  #   website: 'http://jongrobbqny.com'
  # )

  # Business.create!(
  #   name: "Mia's Bakery",
  #   address: '139 Smith St',
  #   city: 'Brooklyn',
  #   state: 'NY',
  #   zip_code: '11201',
  #   lat: 40.687064848371165,
  #   lng: -73.99004773565743,
  #   open: '07:00AM EST',
  #   close: '12:00AM EST',
  #   category: 'Bakeries, Cafes, Desserts',
  #   price: '$$',
  #   phone_number: '(347) 987-3194',
  #   website: 'http://www.miasbrooklyn.com'
  # )

  # Business.create!(
  #   name: "Jane Restaurant",
  #   address: '100 W Houston St',
  #   city: 'New York',
  #   state: 'NY',
  #   zip_code: '10012',
  #   lat: 40.72737687572234,
  #   lng: -74.00019649797562,
  #   open: '09:00AM EST',
  #   close: '09:00PM EST',
  #   category: 'Breakfast & Brunch, American (New), Bars',
  #   price: '$$',
  #   phone_number: '(212) 254-7000',
  #   website: 'https://www.janerestaurant.com'
  # )

  # Business.create!(
  #   name: "Joe's Pizza",
  #   address: '7 Carmine St',
  #   city: 'New York',
  #   state: 'NY',
  #   zip_code: '10014',
  #   lat: 40.73069222060482,
  #   lng: -74.00214924227208,
  #   open: '10:00AM EST',
  #   close: '05:00AM EST',
  #   category: 'Pizza',
  #   price: '$',
  #   phone_number: '(212) 366-1182',
  #   website: 'http://www.joespizzanyc.com'
  # )

  # Business.create!(
  #   name: "Zero Otto Nove",
  #   address: '15 W 21st St',
  #   city: 'New York',
  #   state: 'NY',
  #   zip_code: '10010',
  #   lat: 40.740864509379485,
  #   lng: -73.99156589160633,
  #   open: '04:00PM EST',
  #   close: '10:00PM EST',
  #   category: 'Italian, Pizza',
  #   price: '$$',
  #   phone_number: '(212) 242-0899',
  #   website: 'https://zeroottonove.com/nyc'
  # )

  # Business.create!(
  #   name: "Boucherie Union Square",
  #   address: '225 Park Ave S',
  #   city: 'New York',
  #   state: 'NY',
  #   zip_code: '10003',
  #   lat: 40.737209646779675,
  #   lng: -73.98789237121142,
  #   open: '10:00AM EST',
  #   close: '12:00AM EST',
  #   category: 'Steakhouses, French, Cocktail Bars',
  #   price: '$$$',
  #   phone_number: '(212) 353-0200',
  #   website: 'https://www.boucherie.nyc'
  # )

  # Business.create!(
  #   name: "Ootoya Chelsea",
  #   address: '8 W 18th St',
  #   city: 'New York',
  #   state: 'NY',
  #   zip_code: '10011',
  #   lat: 40.73881967084371,
  #   lng: -73.99279184470173,
  #   open: '11:30AM EST',
  #   close: '9:30PM EST',
  #   category: 'Sushi Bars, Hot Pot, Japanese Curry',
  #   price: '$$',
  #   phone_number: '(212) 255-0018',
  #   website: 'https://ootoya.us'
  # )

  # Business.create!(
  #   name: "Taboonette",
  #   address: '30 E 13th St',
  #   city: 'New York',
  #   state: 'NY',
  #   zip_code: '10003',
  #   lat: 40.73467813733269,
  #   lng: -73.99278977804943,
  #   open: '10:00AM EST',
  #   close: '10:00PM EST',
  #   category: 'Mediterranean, Middle Eastern, American (New)',
  #   price: '$$',
  #   phone_number: '(212) 510-7881',
  #   website: 'https://taboonette.com'
  # )

  # Business.create!(
  #   name: "Abraco",
  #   address: '81 E 7th St',
  #   city: 'New York',
  #   state: 'NY',
  #   zip_code: '10003',
  #   lat: 40.72735879102908,
  #   lng: -73.98616181775907,
  #   open: '09:00AM EST',
  #   close: '06:00PM EST',
  #   category: 'Coffee Roasteries, Bakeries',
  #   price: '$$',
  #   phone_number: '(212) 388-9731',
  #   website: 'https://www.abraconyc.com'
  # )

  Business.all.each do |business|
    (1..6).each do |i|
      image = URI.open("https://qelp-seeds.s3.amazonaws.com/businesses/#{business.id}/#{i}.jpeg")
      business.photos.attach(
        io: image,
        filename: "#{business.id}/#{i}.jpeg",
        content_type: "image/jpeg"
      )
    end
  end

  puts "Done!"
# end
