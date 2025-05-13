const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
    await initDB();
};

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, owner: "681d050d0a1549bceca410ad",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

main().catch((err) => {
    console.log("Error:", err);
});