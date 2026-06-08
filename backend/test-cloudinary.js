import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const run = async () => {
    console.log("Testing cloudinary upload with:", {
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY , 
        secret_length: process.env.CLOUDINARY_API_SECRET ? process.env.CLOUDINARY_API_SECRET.length : 0
    });
    try {
        const uploadResult = await cloudinary.uploader.upload("./seed.js", { resource_type: "auto" });
        console.log("Success:", uploadResult.secure_url);
    } catch (e) {
        console.error("Cloudinary Error:", e);
    }
};

run();
