import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const run = async () => {
    try {
        const formData = new FormData();
        formData.append("name", "Test Product");
        formData.append("description", "A very cool test product");
        formData.append("price", "999");
        formData.append("category", "Men");
        formData.append("subCategory", "TopWear");
        formData.append("bestseller", "true");
        formData.append("sizes", JSON.stringify(["M", "L"]));

        // Create 4 dummy files
        fs.writeFileSync("dummy1.jpg", "dummy content");
        fs.writeFileSync("dummy2.jpg", "dummy content");
        fs.writeFileSync("dummy3.jpg", "dummy content");
        fs.writeFileSync("dummy4.jpg", "dummy content");

        formData.append("image1", fs.createReadStream("dummy1.jpg"));
        formData.append("image2", fs.createReadStream("dummy2.jpg"));
        formData.append("image3", fs.createReadStream("dummy3.jpg"));
        formData.append("image4", fs.createReadStream("dummy4.jpg"));

        console.log("Sending POST to http://localhost:8000/api/product/addproduct");
        const response = await axios.post("http://localhost:8000/api/product/addproduct", formData, {
            headers: formData.getHeaders(),
            withCredentials: true
        });

        console.log("Success:", response.data);
    } catch (e) {
        console.error("Error:", e.response ? e.response.data : e.message);
    } finally {
        fs.unlinkSync("dummy1.jpg");
        fs.unlinkSync("dummy2.jpg");
        fs.unlinkSync("dummy3.jpg");
        fs.unlinkSync("dummy4.jpg");
    }
};

run();
