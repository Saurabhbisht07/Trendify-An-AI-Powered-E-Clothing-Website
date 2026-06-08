
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './model/userModel.js';

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB");
        const users = await User.find({});
        console.log("Users in DB:", users.length);
        users.forEach(u => {
            console.log(`- ${u.email} (Has password: ${!!u.password})`);
        });
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkUsers();
