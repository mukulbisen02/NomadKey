const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

// const mongoURI = "mongodb://localhost:27017/wanderlust";
const mongoURI = "mongodb://localhost:27017/NomadKey";

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

async function main() {
   await mongoose.connect(mongoURI);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data.");
};

initDB();

// initDB().then(() => {
//     console.log("Database initialization complete.");
//     mongoose.connection.close();
// }).catch((err) => {
//     console.error("Error initializing database:", err);
//     mongoose.connection.close();
// });