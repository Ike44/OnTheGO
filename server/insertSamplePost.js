const mongoose = require('mongoose');
const Post = require('./models/posts');

const mongoURI = 'mongodb+srv://OnTheGoDevs:OnTheGoDevs1@onthego.gpg4a.mongodb.net/onthegoDB?retryWrites=true&w=majority';

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
    image: "https://example.com/bali.jpg",
    upvotes: 120,
    downvotes: 5,
    createdAt: new Date()
  },
  {
    title: "The Wonders of Paris",
    body: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré. Paris is also famous for its museums and architectural landmarks. The city's romantic ambiance and rich history attract millions of visitors each year.",
    image: "https://example.com/paris.jpg",
    upvotes: 200,
    downvotes: 10,
    createdAt: new Date()
  },
  {
    title: "Exploring the Great Wall of China",
    body: "The Great Wall of China, one of the greatest wonders of the world, was listed as a World Heritage by UNESCO in 1987. Just like a gigantic dragon, the Great Wall winds up and down across deserts, grasslands, mountains, and plateaus, stretching approximately 21,196 kilometers from east to west of China. With a history of more than 2,000 years, some of the sections are now in ruins or have disappeared. However, it is still one of the most appealing attractions all around the world owing to its architectural grandeur and historical significance.",
    image: "https://example.com/greatwall.jpg",
    upvotes: 150,
    downvotes: 8,
    createdAt: new Date()
  },
  {
    title: "Safari Adventures in Kenya",
    body: "Kenya is renowned for its classic savanna safaris. It is a country of dramatic extremes and classic contrasts; deserts and alpine snows; forests and open plains; the metropolis of Nairobi and colorful tribal cultures; freshwater lakes and coral reefs. For many people, Kenya is East Africa in microcosm. The wildlife safaris have been the top tourist attraction for Kenya for many years. The annual wildebeest migration alone involves over 1.5 million animals arriving in July and departing in November.",
    image: "https://example.com/kenya.jpg",
    upvotes: 180,
    downvotes: 12,
    createdAt: new Date()
  },
  {
    title: "The Majesty of the Grand Canyon",
    body: "The Grand Canyon, located in Arizona, USA, is a natural wonder that attracts millions of visitors each year. Carved by the Colorado River, the canyon is 277 miles long, up to 18 miles wide, and attains a depth of over a mile. The Grand Canyon is known for its visually overwhelming size and its intricate and colorful landscape. Geologically, it is significant because the sequence of rock layers reveals much of the early geological history of the North American continent.",
    image: "https://example.com/grandcanyon.jpg",
    upvotes: 220,
    downvotes: 15,
    createdAt: new Date()
  },
  {
    title: "The Serenity of Santorini",
    body: "Santorini, a volcanic island in the Cyclades group of the Greek islands, is known for its stunning sunsets, white-washed houses, and crystal-clear waters. The island's unique landscape, formed by a volcanic eruption, offers breathtaking views and a serene atmosphere. Visitors can explore the charming villages, relax on the beautiful beaches, and enjoy the delicious local cuisine. Santorini is a popular destination for honeymooners and travelers seeking a peaceful and picturesque getaway.",
    image: "https://example.com/santorini.jpg",
    upvotes: 190,
    downvotes: 7,
    createdAt: new Date()
  },
  {
    title: "The Vibrant Culture of Tokyo",
    body: "Tokyo, the capital city of Japan, is a bustling metropolis that seamlessly blends traditional culture with modern innovation. From ancient temples and shrines to futuristic skyscrapers and cutting-edge technology, Tokyo offers a unique and vibrant experience for visitors. The city is known for its delicious cuisine, including sushi, ramen, and tempura, as well as its lively entertainment districts, such as Shibuya and Shinjuku. Tokyo is also home to numerous museums, parks, and shopping areas, making it a diverse and exciting destination.",
    image: "https://example.com/tokyo.jpg",
    upvotes: 250,
    downvotes: 20,
    createdAt: new Date()
  },
  {
    title: "The Natural Beauty of New Zealand",
    body: "New Zealand is renowned for its stunning natural landscapes, including mountains, forests, lakes, and beaches. The country's diverse scenery has made it a popular destination for outdoor enthusiasts and adventure seekers. Visitors can explore the breathtaking fjords of Milford Sound, hike the scenic trails of Tongariro National Park, and relax on the pristine beaches of the Bay of Islands. New Zealand's unique wildlife, including the kiwi bird and the Hector's dolphin, adds to the country's charm and appeal.",
    image: "https://example.com/newzealand.jpg",
    upvotes: 210,
    downvotes: 10,
    createdAt: new Date()
  },
  {
    title: "The Historic Charm of Rome",
    body: "Rome, the capital city of Italy, is a treasure trove of history, art, and culture. Known as the 'Eternal City,' Rome is home to iconic landmarks such as the Colosseum, the Roman Forum, and the Pantheon. Visitors can explore the Vatican City, admire the masterpieces of the Renaissance, and stroll through the charming streets of Trastevere. Rome's rich history, delicious cuisine, and vibrant atmosphere make it a must-visit destination for travelers from around the world.",
    image: "https://example.com/rome.jpg",
    upvotes: 230,
    downvotes: 18,
    createdAt: new Date()
  },
  {
    title: "The Exotic Allure of Marrakech",
    body: "Marrakech, a vibrant city in Morocco, is known for its bustling souks, stunning palaces, and rich cultural heritage. The city's historic medina is a UNESCO World Heritage site, filled with narrow alleys, colorful markets, and traditional riads. Visitors can explore the beautiful Jardin Majorelle, visit the impressive Koutoubia Mosque, and experience the lively atmosphere of Jemaa el-Fnaa square. Marrakech's unique blend of African, Arab, and Berber influences creates an exotic and captivating destination.",
    image: "https://example.com/marrakech.jpg",
    upvotes: 170,
    downvotes: 9,
    createdAt: new Date()
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