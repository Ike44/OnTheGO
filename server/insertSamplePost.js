const mongoose = require('mongoose');
const Post = require('./models/posts');
require('dotenv').config({ path: require('find-config')('.env') }) // Load environment variables from .env file

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Database connection error:', err);
});

const samplePosts = [
  {
    title: "Beautiful Beaches of Bali",
    body: "Bali is known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. Bali offers a unique blend of modern tourist facilities combined with wonderful shopping and a rich past and heritage. The island's natural beauty, vibrant culture, and friendly locals make it a top destination for travelers from around the world.",
    images: "https://example.com/bali.jpg",
    upvotes: 120,
    downvotes: 5,
    createdAt: new Date(),
    category: "City",
    businessWebsite: "https://example.com",
    fromDate: new Date('2024-05-01'),
    toDate: new Date('2024-05-10'),
    rating: 4.5,
    location: {
    description: "Bali, Indonesia", 
    placeId: "ChIJsXzj9JNoazsR8jC3xJ4SO00"
    }
  },
  {
    title: "The Wonders of Paris",
    body: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré. Paris is also famous for its museums and architectural landmarks. The city's romantic ambiance and rich history attract millions of visitors each year.",
    images: "https://example.com/paris.jpg",
    upvotes: 200,
    downvotes: 10,
    createdAt: new Date(),
    category: "City",
    businessWebsite: "https://paris.com",
    fromDate: new Date('2024-06-01'),
    toDate: new Date('2024-06-15'),
    rating: 4.8,
    location: {
      description: "Paris, France", 
      placeId: "ChIJD7fiBh9u5kcRYJXqZB3h0i8"
    }
  },
  {
    title: "Exploring the Great Wall of China",
    body: "The Great Wall of China, one of the greatest wonders of the world, was listed as a World Heritage by UNESCO in 1987. Just like a gigantic dragon, the Great Wall winds up and down across deserts, grasslands, mountains, and plateaus, stretching approximately 21,196 kilometers from east to west of China. With a history of more than 2,000 years, some of the sections are now in ruins or have disappeared. However, it is still one of the most appealing attractions all around the world owing to its architectural grandeur and historical significance.",
    images: "https://example.com/greatwall.jpg",
    upvotes: 150,
    downvotes: 8,
    createdAt: new Date(),
    createdAt: new Date(),
    category: "Historical", 
    businessWebsite: "https://greatwall.com", 
    fromDate: new Date('2024-07-01'), 
    toDate: new Date('2024-07-10'), 
    rating: 5,
    location: {
    description: "Great Wall of China, China", 
    placeId: "ChIJQzA6d3D1eTARavxbp6T8-H0" 
    }
  },
  {
    title: "Safari Adventures in Kenya",
    body: "Kenya is renowned for its classic savanna safaris. It is a country of dramatic extremes and classic contrasts; deserts and alpine snows; forests and open plains; the metropolis of Nairobi and colorful tribal cultures; freshwater lakes and coral reefs. For many people, Kenya is East Africa in microcosm. The wildlife safaris have been the top tourist attraction for Kenya for many years. The annual wildebeest migration alone involves over 1.5 million animals arriving in July and departing in November.",
    images: "https://example.com/kenya.jpg",
    upvotes: 180,
    downvotes: 12,
    createdAt: new Date(),
    category: "Safari",
    businessWebsite: "https://kenyasafari.com", 
    fromDate: new Date('2024-08-01'), 
    toDate: new Date('2024-08-15'), 
    rating: 4.7, 
    location: {
      description: "Masai Mara, Kenya", 
      placeId: "ChIJu7g2xK1AfRkRlyOYO1vD6rI" 
    }
  },
  {
    title: "The Majesty of the Grand Canyon",
    body: "The Grand Canyon, located in Arizona, USA, is a natural wonder that attracts millions of visitors each year. Carved by the Colorado River, the canyon is 277 miles long, up to 18 miles wide, and attains a depth of over a mile. The Grand Canyon is known for its visually overwhelming size and its intricate and colorful landscape. Geologically, it is significant because the sequence of rock layers reveals much of the early geological history of the North American continent.",
    images: "https://example.com/grandcanyon.jpg",
    upvotes: 220,
    downvotes: 15,
    createdAt: new Date(),
    category: "Nature", 
    businessWebsite: "https://grandcanyon.com", 
    fromDate: new Date('2024-09-01'), 
    toDate: new Date('2024-09-07'), 
    rating: 4.9,
    location: {
    description: "Grand Canyon, Arizona, USA", 
    placeId: "ChIJybJbqWm_AoARw-Xu7ZzVf0E" 
    }
  },
  {
    title: "The Serenity of Santorini",
    body: "Santorini, a volcanic island in the Cyclades group of the Greek islands, is known for its stunning sunsets, white-washed houses, and crystal-clear waters. The island's unique landscape, formed by a volcanic eruption, offers breathtaking views and a serene atmosphere. Visitors can explore the charming villages, relax on the beautiful beaches, and enjoy the delicious local cuisine. Santorini is a popular destination for honeymooners and travelers seeking a peaceful and picturesque getaway.",
    images: "https://example.com/santorini.jpg",
    upvotes: 190,
    downvotes: 7,
    createdAt: new Date(),
    category: "Island",
    businessWebsite: "https://santorini.com", 
    fromDate: new Date('2024-10-01'), 
    toDate: new Date('2024-10-10'), 
    rating: 4.6, 
    location: {
      description: "Santorini, Greece", 
      placeId: "ChIJyQzLbbTdbg0RLRq7xP6XlMY" 
    }
  },
  {
    title: "The Vibrant Culture of Tokyo",
    body: "Tokyo, the capital city of Japan, is a bustling metropolis that seamlessly blends traditional culture with modern innovation. From ancient temples and shrines to futuristic skyscrapers and cutting-edge technology, Tokyo offers a unique and vibrant experience for visitors. The city is known for its delicious cuisine, including sushi, ramen, and tempura, as well as its lively entertainment districts, such as Shibuya and Shinjuku. Tokyo is also home to numerous museums, parks, and shopping areas, making it a diverse and exciting destination.",
    images: "https://example.com/tokyo.jpg",
    upvotes: 250,
    downvotes: 20,
    createdAt: new Date(),
    category: "City", 
    businessWebsite: "https://tokyo.com", 
    fromDate: new Date('2024-11-01'), 
    toDate: new Date('2024-11-10'), 
    rating: 4.8,
    location: {
      description: "Tokyo, Japan", 
      placeId: "ChIJzW4Vnpn45D4Rs7k-MfLslQU" 
    }
  },
  {
    title: "The Natural Beauty of New Zealand",
    body: "New Zealand is renowned for its stunning natural landscapes, including mountains, forests, lakes, and beaches. The country's diverse scenery has made it a popular destination for outdoor enthusiasts and adventure seekers. Visitors can explore the breathtaking fjords of Milford Sound, hike the scenic trails of Tongariro National Park, and relax on the pristine beaches of the Bay of Islands. New Zealand's unique wildlife, including the kiwi bird and the Hector's dolphin, adds to the country's charm and appeal.",
    images: "https://example.com/newzealand.jpg",
    upvotes: 210,
    downvotes: 10,
    createdAt: new Date(),
    category: "Nature", 
    businessWebsite: "https://newzealand.com", 
    fromDate: new Date('2024-12-01'),
    toDate: new Date('2024-12-15'), 
    rating: 4.9, 
    location: {
    description: "Milford Sound, New Zealand", 
    placeId: "ChIJy5L3KjTt5TARHEi7KKFyUlg" 
    }
  },
  {
    title: "The Historic Charm of Rome",
    body: "Rome, the capital city of Italy, is a treasure trove of history, art, and culture. Known as the 'Eternal City,' Rome is home to iconic landmarks such as the Colosseum, the Roman Forum, and the Pantheon. Visitors can explore the Vatican City, admire the masterpieces of the Renaissance, and stroll through the charming streets of Trastevere. Rome's rich history, delicious cuisine, and vibrant atmosphere make it a must-visit destination for travelers from around the world.",
    images: "https://example.com/rome.jpg",
    upvotes: 230,
    downvotes: 18,
    createdAt: new Date(),
    category: "City", 
    businessWebsite: "https://rome.com", 
    fromDate: new Date('2024-12-10'), 
    toDate: new Date('2024-12-20'), 
    rating: 4.7, 
    location: {
    description: "Rome, Italy", 
    placeId: "ChIJP3Sa5xQoZ0gRY5GQ4p7K8bg" 
    }
  },
  {
    title: "The Exotic Allure of Marrakech",
    body: "Marrakech, a vibrant city in Morocco, is known for its bustling souks, stunning palaces, and rich cultural heritage. The city's historic medina is a UNESCO World Heritage site, filled with narrow alleys, colorful markets, and traditional riads. Visitors can explore the beautiful Jardin Majorelle, visit the impressive Koutoubia Mosque, and experience the lively atmosphere of Jemaa el-Fnaa square. Marrakech's unique blend of African, Arab, and Berber influences creates an exotic and captivating destination.",
    images: "https://example.com/marrakech.jpg",
    upvotes: 170,
    downvotes: 9,
    createdAt: new Date(),
    category: "City", 
    businessWebsite: "https://marrakech.com", 
    fromDate: new Date('2025-01-01'), 
    toDate: new Date('2025-01-10'), 
    rating: 4.6, 
    location: {
      description: "Marrakech, Morocco", 
      placeId: "ChIJaTGvFokfJx0RxyHioyY55Q0" 
    }
  },
  {
    title: "The Beauty of Mexico City",
    body: "Mexico City, the capital of Mexico, is a vibrant metropolis blending the ancient with the modern. Visitors can explore the historical sites like the Zócalo and the ancient Aztec Templo Mayor, and also enjoy modern attractions such as the Chapultepec Castle and the floating gardens of Xochimilco. Known for its delicious cuisine, rich cultural heritage, and dynamic arts scene, Mexico City is an unforgettable destination.",
    images: ["https://example.com/mexico-city.jpg"], 
    upvotes: 200,
    downvotes: 10,
    createdAt: new Date(),
    category: "City",
    businessWebsite: "https://mexicocity.com",
    fromDate: new Date('2025-03-01'),
    toDate: new Date('2025-03-07'),
    rating: 4.8,
    location: {
    description: "Mexico City, Mexico",
    placeId: "ChIJCzYy5ISdYzURgI3p0gF8qqI"
    }
  },
  {
    title: "Explore the Beaches of Cancun",
    body: "Cancun, located on the northeastern coast of the Yucatán Peninsula, is famous for its stunning white-sand beaches and crystal-clear turquoise waters. It's a prime destination for beach lovers, offering activities like snorkeling, scuba diving, and beach resorts. Cancun is also home to the ancient Mayan ruins of El Rey and the nearby Isla Mujeres, offering a mix of relaxation and history.",
    images: ["https://example.com/cancun-beach.jpg"],
    upvotes: 250,
    downvotes: 15,
    createdAt: new Date(),
    category: "Beach",
    businessWebsite: "https://cancun.com",
    fromDate: new Date('2025-04-01'),
    toDate: new Date('2025-04-10'),
    rating: 4.7,
    location: {
    description: "Cancun, Mexico",
    placeId: "ChIJj6lI98i45Y4Rj1yvvSCr8Ek"
    }
  },
  {
    title: "Discover the Wonders of Chichen Itza",
    body: "Chichen Itza, one of the New Seven Wonders of the World, is an ancient Mayan city located in the Yucatán Peninsula. It is home to the famous El Castillo pyramid, an impressive testament to Mayan engineering and astronomy. The site also features a cenote (sacred well), the Temple of the Warriors, and the Ball Court. Chichen Itza is a UNESCO World Heritage site and a must-see for history and archaeology enthusiasts.",
    images: ["https://example.com/chichen-itza.jpg"],
    upvotes: 180,
    downvotes: 8,
    createdAt: new Date(),
    category: "Historical",
    businessWebsite: "https://chichenitza.com",
    fromDate: new Date('2025-05-01'),
    toDate: new Date('2025-05-07'),
    rating: 4.9,
    location: {
    description: "Chichen Itza, Yucatán, Mexico",
    placeId: "ChIJJ8pBhC4iFY4R_vjmXKStV7o"
    }
  },
  {
    title: "The Paradise of Bora Bora",
    body: "Bora Bora, often referred to as the 'Pearl of the Pacific,' is a tropical paradise in French Polynesia, known for its stunning turquoise lagoons, crystal-clear waters, and majestic Mount Otemanu. This island offers idyllic overwater bungalows, incredible snorkeling experiences, and romantic sunsets, making it a popular honeymoon and luxury travel destination.",
    images: ["https://example.com/bora-bora.jpg"], 
    upvotes: 230,
    downvotes: 12,
    createdAt: new Date(),
    category: "Island",
    businessWebsite: "https://borabora.com",
    fromDate: new Date('2025-06-01'),
    toDate: new Date('2025-06-10'),
    rating: 4.9,
    location: {
    description: "Bora Bora, French Polynesia",
    placeId: "ChIJG5JWg5JuHjoR0Wxhhshm8og"
    }
  },
  {
    title: "Exploring Tahiti's Culture and Beauty",
    body: "Tahiti, the largest island in French Polynesia, offers a blend of stunning natural beauty and rich Polynesian culture. Known for its black-sand beaches, lush rainforests, and crystal-clear waters, Tahiti is also home to vibrant markets, rich history, and captivating traditions. Visitors can explore the island's sacred temples, enjoy traditional dance performances, and taste the delicious local cuisine.",
    images: ["https://example.com/tahiti.jpg"],
    upvotes: 210,
    downvotes: 8,
    createdAt: new Date(),
    category: "Island",
    businessWebsite: "https://tahiti.com",
    fromDate: new Date('2025-07-01'),
    toDate: new Date('2025-07-10'),
    rating: 4.8,
    location: {
    description: "Tahiti, French Polynesia",
    placeId: "ChIJe3WWTgkZHjoRUbmyNTxY6Co"
    }
  },
  {
    title: "The Magical Marquesas Islands",
    body: "The Marquesas Islands, located in the northeastern part of French Polynesia, are among the most remote and stunningly beautiful islands in the world. With dramatic cliffs, pristine beaches, and ancient archaeological sites, the Marquesas offer a unique blend of natural beauty and cultural heritage. Visitors can hike through lush valleys, explore sacred rituals, and immerse themselves in a serene and unspoiled environment.",
    images: ["https://example.com/marquesas.jpg"],
    upvotes: 190,
    downvotes: 5,
    createdAt: new Date(),
    category: "Island",
    businessWebsite: "https://marquesas.com",
    fromDate: new Date('2025-08-01'),
    toDate: new Date('2025-08-10'),
    rating: 4.7,
    location: {
      description: "Marquesas Islands, French Polynesia",
      placeId: "ChIJSZnqVEf7HjoRsm7xxdkxz2I"
    }
  },
  {
    title: "The Splendor of Barcelona",
    body: "Barcelona, located on the northeastern coast of the Iberian Peninsula, is a vibrant city known for its stunning architecture, rich history, and artistic heritage. Visitors can admire the incredible works of Antoni Gaudí, such as the Sagrada Família and Park Güell, stroll along the iconic Las Ramblas, and relax on the golden beaches of Barceloneta. Barcelona offers a perfect mix of culture, cuisine, and Mediterranean charm.",
    images: ["https://example.com/barcelona.jpg"], 
    upvotes: 300,
    downvotes: 15,
    createdAt: new Date(),
    category: "City",
    businessWebsite: "https://barcelona.com",
    fromDate: new Date('2025-09-01'),
    toDate: new Date('2025-09-10'),
    rating: 4.8,
    location: {
      description: "Barcelona, Spain",
      placeId: "ChIJmQjiT_zo1UcRZpmRmeJ06ZY"
    }
  },
  {
    title: "Discovering the Historic Beauty of Madrid",
    body: "Madrid, the capital of Spain, is a dynamic city that blends royal history with modern charm. The city is home to magnificent landmarks such as the Royal Palace and the Prado Museum, which houses one of the finest collections of European art. Visitors can also relax in the beautiful Retiro Park, explore the lively Plaza Mayor, and indulge in traditional Spanish cuisine. Madrid's energy and culture make it a must-visit destination.",
    images: ["https://example.com/madrid.jpg"],
    upvotes: 280,
    downvotes: 20,
    createdAt: new Date(),
    category: "City",
    businessWebsite: "https://madrid.com",
    fromDate: new Date('2025-10-01'),
    toDate: new Date('2025-10-07'),
    rating: 4.7,
    location: {
      description: "Madrid, Spain",
      placeId: "ChIJD7fiBh9u5kcRy6V3pCqlM5g"
    }
  },
  {
    title: "The Beauty of the Costa Brava",
    body: "The Costa Brava, located in the northeastern part of Catalonia, is known for its rugged coastline, charming fishing villages, and stunning beaches. This beautiful region is perfect for outdoor enthusiasts, offering hiking trails along dramatic cliffs, crystal-clear waters for swimming and snorkeling, and scenic towns like Tossa de Mar and Cadaqués. Costa Brava is a perfect blend of relaxation and adventure.",
    images: ["https://example.com/costa-brava.jpg"],
    upvotes: 250,
    downvotes: 12,
    createdAt: new Date(),
    category: "Beach",
    businessWebsite: "https://costabrava.com",
    fromDate: new Date('2025-11-01'),
    toDate: new Date('2025-11-07'),
    rating: 4.9,
    location: {
      description: "Costa Brava, Spain",
      placeId: "ChIJBwra1Fmu2U0RIMQHt8ANFcM"
    }
  },
  {
    title: "The Majestic Great Wall of China",
    body: "The Great Wall of China is one of the most iconic and awe-inspiring structures in the world. Stretching over 13,000 miles, the Great Wall was built to protect Chinese states and empires from invasions. Today, it stands as a testament to ancient engineering and is a popular tourist destination, with breathtaking views and historical significance. Visitors can hike along different sections, including Badaling, Mutianyu, and Jinshanling, for a truly memorable experience.",
    images: ["https://example.com/great-wall.jpg"], 
    upvotes: 320,
    downvotes: 25,
    createdAt: new Date(),
    category: "Historical",
    businessWebsite: "https://greatwall.com",
    fromDate: new Date('2025-12-01'),
    toDate: new Date('2025-12-10'),
    rating: 4.8,
    location: {
      description: "Great Wall of China, Beijing, China",
      placeId: "ChIJC5i9XXWk1TURw93Vlm8NRgo"
    }
  },
  {
    title: "The Splendor of the Forbidden City",
    body: "The Forbidden City, located in the heart of Beijing, was once the imperial palace of Chinese emperors. With nearly 1,000 buildings, this architectural marvel is a UNESCO World Heritage site and one of the most visited museums in the world. Visitors can explore the ornate halls, vast courtyards, and intricate gardens while learning about China’s imperial history and culture. The Forbidden City represents the grandeur and power of the ancient Chinese dynasty.",
    images: ["https://example.com/forbidden-city.jpg"],
    upvotes: 280,
    downvotes: 18,
    createdAt: new Date(),
    category: "Historical",
    businessWebsite: "https://forbiddencity.com",
    fromDate: new Date('2026-01-01'),
    toDate: new Date('2026-01-07'),
    rating: 4.7,
    location: {
      description: "Forbidden City, Beijing, China",
      placeId: "ChIJuXeX7G7a1TURB7pM7z2xF18"
    }
  },
  {
    title: "Exploring the Terracotta Army in Xi'an",
    body: "The Terracotta Army, located in Xi'an, is one of the most significant archaeological discoveries of the 20th century. Discovered in 1974, it consists of over 8,000 life-sized statues of soldiers, horses, and chariots that were buried with China’s first emperor, Qin Shi Huang. The statues were meant to protect the emperor in the afterlife. Today, visitors can explore the vast museum complex and marvel at the meticulous craftsmanship and historical importance of this ancient army.",
    images: ["https://example.com/terracotta-army.jpg"],
    upvotes: 250,
    downvotes: 20,
    createdAt: new Date(),
    category: "Historical",
    businessWebsite: "https://terracottaarmy.com",
    fromDate: new Date('2026-02-01'),
    toDate: new Date('2026-02-07'),
    rating: 4.9,
    location: {
      description: "Terracotta Army, Xi'an, China",
      placeId: "ChIJU8yEivfuFz0R3I-Vx8pPog0"
    }
  },
  {
    title: "The Natural Beauty of Iguazu Falls",
    body: "Iguazu Falls, located on the border between Brazil and Argentina, is one of the most spectacular natural wonders in the world. The falls, made up of over 275 individual waterfalls, stretch for nearly 2 miles and create an awe-inspiring spectacle of water and mist. Visitors can explore the falls from both the Brazilian and Argentine sides, with panoramic views from the Brazilian side and close-up experiences from the Argentine side. The surrounding Iguazu National Park is home to diverse wildlife and lush rainforest, making it a popular destination for nature lovers.",
    images: ["https://example.com/iguazu-falls.jpg"],
    upvotes: 320,
    downvotes: 10,
    createdAt: new Date(),
    category: "Nature",
    businessWebsite: "https://iguazufalls.com",
    fromDate: new Date('2026-02-01'),
    toDate: new Date('2026-02-07'),
    rating: 4.8,
    location: {
      description: "Iguazu Falls, Brazil/Argentina",
      placeId: "ChIJ4zFvdoehqJQRrmKMt_ufIQk"
    }
  },
  {
    title: "The Vibrant Culture of Salvador",
    body: "Salvador, the capital of Bahia, is a cultural hub in Brazil known for its Afro-Brazilian heritage, colonial architecture, and lively festivals. The city's historic Pelourinho neighborhood is a UNESCO World Heritage site, filled with colorful buildings, cobbled streets, and vibrant music. Salvador is also famous for its carnival, samba rhythms, and delicious Bahian cuisine. Visitors can explore its rich history, dance to the infectious rhythms of samba, and indulge in local dishes like acarajé and moqueca.",
    images: ["https://example.com/salvador.jpg"],
    upvotes: 300,
    downvotes: 22,
    createdAt: new Date(),
    category: "City",
    businessWebsite: "https://salvador.com",
    fromDate: new Date('2026-01-05'),
    toDate: new Date('2026-01-12'),
    rating: 4.7,
    location: {
      description: "Salvador, Bahia, Brazil",
      placeId: "ChIJr2Xb1ljSo5wR1_AHprA9rS4"
    }
  },
  {
    title: "The Iconic Christ the Redeemer in Rio de Janeiro",
    body: "Christ the Redeemer is one of the most iconic landmarks in Brazil, located on the summit of Mount Corcovado in Rio de Janeiro. Standing at 98 feet tall, this magnificent statue of Jesus Christ overlooks the city and offers breathtaking panoramic views of the surrounding mountains, beaches, and downtown Rio. The statue is a symbol of Christianity and is a must-visit destination for anyone traveling to Brazil.",
    images: ["https://example.com/christ-the-redeemer.jpg"], 
    upvotes: 350,
    downvotes: 18,
    createdAt: new Date(),
    category: "Landmark",
    businessWebsite: "https://www.visitriodejaneiro.com",
    fromDate: new Date('2025-12-15'),
    toDate: new Date('2025-12-20'),
    rating: 4.9,
    location: {
      description: "Christ the Redeemer, Rio de Janeiro, Brazil",
      placeId: "ChIJiYXI6tqOq5wR_JU2izkmIFw"
    }
  },
  {
    title: "The Timeless Beauty of Kyoto's Temples",
    body: "Kyoto, once the capital of Japan, is home to some of the most beautiful temples, shrines, and traditional Japanese gardens. The city is known for its historical significance and its well-preserved cultural heritage. Visitors can explore the stunning Kinkaku-ji (Golden Pavilion), the serene Fushimi Inari Shrine with its iconic red torii gates, and the beautiful Arashiyama Bamboo Grove. Kyoto is also famous for its exquisite tea ceremonies, kaiseki dining, and traditional geisha culture.",
    images: ["https://example.com/kyoto-temples.jpg"], 
    upvotes: 280,
    downvotes: 15,
    createdAt: new Date(),
    category: "Cultural",
    businessWebsite: "https://kyoto.com",
    fromDate: new Date('2025-11-15'),
    toDate: new Date('2025-11-22'),
    rating: 4.9,
    location: {
      description: "Kyoto, Japan",
      placeId: "ChIJE1b4IjCO9jQRriIbwwlSvmY"
    }
  },
  {
    title: "The Bustling Streets of Tokyo",
    body: "Tokyo, the capital city of Japan, is a dazzling metropolis that blends ancient traditions with cutting-edge modernity. The city is famous for its high-tech skyscrapers, shopping districts like Shibuya and Shinjuku, and tranquil temples such as Senso-ji in Asakusa. Visitors can enjoy a diverse range of experiences, from the neon-lit streets of Akihabara to the serene gardens of the Imperial Palace. Tokyo's vibrant food scene, including sushi, ramen, and tempura, is an essential part of the city's charm.",
    images: ["https://example.com/tokyo-streets.jpg"],
    upvotes: 320,
    downvotes: 20,
    createdAt: new Date(),
    category: "City",
    businessWebsite: "https://tokyo.com",
    fromDate: new Date('2026-01-01'),
    toDate: new Date('2026-01-07'),
    rating: 4.8,
    location: {
      description: "Tokyo, Japan",
      placeId: "ChIJV6o3N6EKhzARkF9iH7a7G0I"
    }
  },
  {
    title: "Exploring Mount Fuji",
    body: "Mount Fuji, Japan's tallest and most iconic mountain, is a must-see for nature lovers and adventure seekers. Known for its perfectly symmetrical shape and serene beauty, Mount Fuji is a popular destination for hiking, climbing, and photography. The mountain is part of the Fuji-Hakone-Izu National Park, and visitors can enjoy panoramic views of the surrounding lakes, forests, and the city of Tokyo from its summit. The area also offers peaceful onsen (hot spring) resorts for relaxation after a day of exploring.",
    images: ["https://example.com/mount-fuji.jpg"],
    upvotes: 350,
    downvotes: 10,
    createdAt: new Date(),
    category: "Natural",
    businessWebsite: "https://mountfuji.com",
    fromDate: new Date('2026-02-01'),
    toDate: new Date('2026-02-07'),
    rating: 4.9,
    location: {
      description: "Mount Fuji, Japan",
      placeId: "ChIJx9a-KX1zTj4RzK7VtP4tx9s"
    }
  },
  {
    title: "The Majestic Temples of Bangkok",
    body: "Bangkok, the bustling capital of Thailand, is home to some of the most impressive temples and palaces in Southeast Asia. The Grand Palace, with its intricate architecture and revered Emerald Buddha, is a must-see for any visitor. Wat Arun, known as the Temple of Dawn, offers breathtaking views of the city’s skyline. The city is also famous for its vibrant street markets, delicious street food, and unique blend of modernity and tradition.",
    images: ["https://example.com/bangkok-temples.jpg"],
    upvotes: 250,
    downvotes: 12,
    createdAt: new Date(),
    category: "Cultural",
    businessWebsite: "https://bangkok.com",
    fromDate: new Date('2025-09-10'),
    toDate: new Date('2025-09-17'),
    rating: 4.7,
    location: {
      description: "Bangkok, Thailand",
      placeId: "ChIJyWEHuEmu5T0RbV3aTXiQwB8"
    }
  },
  {
    title: "The Stunning Beaches of Phuket",
    body: "Phuket is Thailand's largest island, renowned for its beautiful beaches, crystal-clear waters, and vibrant nightlife. Patong Beach is famous for its bustling atmosphere and water sports, while Kata and Karon offer more peaceful retreats. Visitors can explore the island's stunning beaches, go scuba diving in the Andaman Sea, and indulge in the local Thai cuisine. Phuket is also known for its luxury resorts and the iconic Big Buddha statue that overlooks the island.",
    images: ["https://example.com/phuket-beaches.jpg"],
    upvotes: 320,
    downvotes: 18,
    createdAt: new Date(),
    category: "Beach",
    businessWebsite: "https://phuket.com",
    fromDate: new Date('2025-12-01'),
    toDate: new Date('2025-12-10'),
    rating: 4.8,
    location: {
      description: "Phuket, Thailand",
      placeId: "ChIJ1ed1v7GGYz0RdQOiyfx-pdw"
    }
  },
  {
    title: "Exploring the Ancient City of Ayutthaya",
    body: "Ayutthaya, the former capital of the Kingdom of Siam, is an ancient city located just north of Bangkok. The city is a UNESCO World Heritage site, home to impressive ruins and temples that date back to the 14th century. Visitors can explore the ancient ruins of Wat Phra Si Sanphet, Wat Ratchaburana, and the towering Buddha statues at Wat Chaiwatthanaram. Ayutthaya offers a glimpse into Thailand’s rich history and culture.",
    images: ["https://example.com/ayutthaya-ruins.jpg"],
    upvotes: 270,
    downvotes: 10,
    createdAt: new Date(),
    category: "Historical",
    businessWebsite: "https://ayutthaya.com",
    fromDate: new Date('2026-01-15'),
    toDate: new Date('2026-01-22'),
    rating: 4.6,
    location: {
      description: "Ayutthaya, Thailand",
      placeId: "ChIJJ9oAAzFG5T0RQUHic0WVh7Y"
    }
  },
  {
    title: "The Colosseum in Rome",
    body: "The Colosseum is one of the most iconic and historic landmarks in Rome. Known as the largest amphitheater ever built, it once hosted gladiator fights and public spectacles. Today, the Colosseum stands as a symbol of ancient Rome’s grandeur and power. Visitors can explore its vast interior, learn about its history, and marvel at its ancient architecture. It is a must-see destination for anyone visiting Italy.",
    images: ["https://example.com/colosseum.jpg"],
    upvotes: 400,
    downvotes: 20,
    createdAt: new Date(),
    category: "Historical",
    businessWebsite: "https://colosseum.com",
    fromDate: new Date('2025-10-01'),
    toDate: new Date('2025-10-07'),
    rating: 4.9,
    location: {
      description: "Colosseum, Rome, Italy",
      placeId: "ChIJOwg_06pYwEwR28RZr9J7TUA"
    }
  },
  {
    title: "The Canals of Venice",
    body: "Venice, one of the most romantic cities in the world, is famous for its canals that weave through the city, offering scenic views and unique experiences. Visitors can take a gondola ride along the Grand Canal, explore the charming bridges and alleys, and admire the stunning architecture of St. Mark's Basilica and the Doge's Palace. Venice is also known for its vibrant cultural scene, including art galleries, opera, and the famous Venice Carnival.",
    images: ["https://example.com/venice-canals.jpg"],
    upvotes: 350,
    downvotes: 15,
    createdAt: new Date(),
    category: "City",
    businessWebsite: "https://venice.com",
    fromDate: new Date('2026-03-01'),
    toDate: new Date('2026-03-07'),
    rating: 4.8,
    location: {
      description: "Venice, Italy",
      placeId: "ChIJvX1YwQuYwEwRpoIuOdSP4kA"
    }
  },
  {
    title: "The Leaning Tower of Pisa",
    body: "The Leaning Tower of Pisa is one of the most recognized and photographed landmarks in the world. Famous for its unintended tilt, this architectural marvel is part of the Pisa Cathedral Complex. Visitors can climb to the top of the tower and enjoy stunning views of the city. The Leaning Tower is a must-visit destination for anyone traveling to Tuscany, and it showcases the brilliant design of medieval Italian architecture.",
    images: ["https://example.com/leaning-tower.jpg"],
    upvotes: 380,
    downvotes: 25,
    createdAt: new Date(),
    category: "Landmark",
    businessWebsite: "https://pisa.com",
    fromDate: new Date('2026-04-01'),
    toDate: new Date('2026-04-05'),
    rating: 4.7,
    location: {
      description: "Leaning Tower of Pisa, Pisa, Italy",
      placeId: "ChIJp5mdNl5s2j4RziFvkT7zR30"
    }
  },
];

const insertSamplePosts = async () => {
  try {
    const savedPosts = await Post.insertMany(samplePosts);
    console.log('Sample posts inserted:', savedPosts);
    mongoose.connection.close();
  } catch (err) {
    console.error('Error inserting sample posts:', err);
    mongoose.connection.close();
  }
};

insertSamplePosts();