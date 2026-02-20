const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Menu = require('../models/Menu');

dotenv.config({ path: './.env' });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nivedyam');

const menuItems = [
    {
        name: "Murgh Malai Tikka",
        category: "Starters",
        price: 450,
        description: "Creamy chicken kebabs marinated in ginger, garlic and cream, grilled in tandoor.",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c175f0?q=80&w=1854&auto=format&fit=crop",
        isVeg: false,
        isSpicy: false,
    },
    {
        name: "Paneer Makhani",
        category: "Main Course",
        price: 380,
        description: "Succulent cubes of cottage cheese simmered in a rich tomato and butter gravy.",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1887&auto=format&fit=crop",
        isVeg: true,
        isSpicy: false,
    },
    {
        name: "Dal Nivedyam",
        category: "Main Course",
        price: 290,
        description: "Our signature black lentils, slow-cooked for 24 hours with handpicked spices.",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1887&auto=format&fit=crop",
        isVeg: true,
        isSpicy: true,
    },
    {
        name: "Garlic Naan",
        category: "Breads",
        price: 90,
        description: "Leavened bread topped with minced garlic and butter.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070&auto=format&fit=crop",
        isVeg: true,
    }
];

const seedData = async () => {
    try {
        await User.deleteMany();
        await Menu.deleteMany();

        // Create Admin
        await User.create({
            username: 'admin',
            password: 'adminpassword123',
            role: 'admin',
        });

        // Create Menu
        await Menu.insertMany(menuItems);

        console.log('Data seeded successfully');
        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
