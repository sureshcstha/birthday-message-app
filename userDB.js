require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");

const UserJson = require("./users.json");

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL);
        await User.deleteMany();
        await User.create(UserJson);
        console.log("success");
    } catch (error) {
        console.log(error);
    }
}

start();