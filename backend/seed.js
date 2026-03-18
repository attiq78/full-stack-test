require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/marketplace';

const sampleProducts = [
  {
    name: 'Nike Air Max 270',
    category: 'shoes',
    status: 'active',
    price: 149.99,
    description: 'Lightweight and stylish running shoes with maximum air cushioning.',
  },
  {
    name: 'Adidas Ultraboost 22',
    category: 'shoes',
    status: 'active',
    price: 189.99,
    description: 'High-performance boost technology for runners who demand the best.',
  },
  {
    name: 'Sony WH-1000XM5',
    category: 'electronics',
    status: 'active',
    price: 349.99,
    description: 'Industry-leading noise cancelling headphones with 30-hour battery life.',
  },
  {
    name: 'Samsung Galaxy Tab S9',
    category: 'electronics',
    status: 'active',
    price: 799.99,
    description: 'Premium Android tablet with AMOLED display and S Pen support.',
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    category: 'clothing',
    status: 'active',
    price: 79.99,
    description: 'Iconic straight fit jeans that have defined American style for decades.',
  },
  {
    name: 'The North Face Puffer Jacket',
    category: 'clothing',
    status: 'inactive',
    price: 249.99,
    description: 'Warm and packable down jacket for cold weather adventures.',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const created = await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${created.length} products`);

    mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
