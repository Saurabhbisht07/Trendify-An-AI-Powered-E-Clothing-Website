import mongoose from "mongoose";

const MONGODB_URL = "mongodb+srv://saurabhbisht1042005_db_user:MS7ZqkupLm5K8baJ@cluster0.cgixu2k.mongodb.net/onecart";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    styleCategory: { type: String, default: '' },
    sizes: { type: Array, required: true },
    date: { type: Number, required: true },
    bestseller: { type: Boolean }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

// ── Image pools (existing local assets) ────────────────────────────────────
const img = {
    maleTop:    ["/products/shirtman1.jpg", "/products/shirtman11.jpg", "/products/shirtman2.jpg", "/products/shirtman22.jpg", "/products/t-shirtman1.jpg", "/products/t-shirtman2.jpg"],
    maleBottom: ["/products/manlower1.jpg", "/products/manlower2.jpg", "/products/pantman1.jpg", "/products/pantman11.webp"],
    maleWinter: ["/products/jacket for men.jpg", "/products/jacket for men1.jpg", "/products/jacket for men2.jpg", "/products/jacket for men3.jpg"],
    femaleTop:  ["/products/shirtwomen1.jpg", "/products/shirtwomen2.jpg", "/products/t-shirtwomen1.jpg", "/products/girl.webp"],
    femaleBottom:["/products/pantwoman1.jpg", "/products/pantwoman2.jpg", "/products/pantwoman3.jpg", "/products/pantwoman4.jpg"],
    femaleWinter:["/products/jacket for women.jpg", "/products/jacket for women1.jpg", "/products/jacket for women2.jpg", "/products/jacket for women3.jpg"],
    kidsTop:    ["/products/kidswear1.jpg", "/products/kidswear2.jpg", "/products/kidt-shirt1.jpg", "/products/kidt-shirt2.jpg"],
    kidsBottom: ["/products/kidspant1.webp", "/products/kidspant2.jpg", "/products/kidspant3.jpg", "/products/kidspant4.jpg"],
    kidsWinter: ["/products/jacket for kids.jpg", "/products/jacket for kids1.jpg", "/products/jacket for kids girl.jpg", "/products/jacket for kids girl1.jpg"],
};

const descriptions = [
    "Elevate your style with this premium, effortlessly cool piece crafted for the modern wardrobe.",
    "Embrace the aesthetic. Premium fabric meets a timeless silhouette — perfect for any occasion.",
    "Techwear meets everyday comfort. Versatile styling with utilitarian details you'll love.",
    "A wardrobe essential that blends contemporary fashion with unmatched comfort and quality.",
    "Crafted with attention to detail — this piece makes a statement wherever you go.",
];

const getR = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getImages = (pool, start) => {
    const n = pool.length;
    return [pool[start % n], pool[(start+1) % n], pool[(start+2) % n], pool[(start+3) % n]];
};

// ── Product definitions ─────────────────────────────────────────────────────
const products = [

    // ═══════════════════════════════════════════
    //  MEN
    // ═══════════════════════════════════════════

    // Casual
    { name: "Classic Oversized Graphic Tee", category: "Men", subCategory: "TopWear", styleCategory: "Casual", pool: img.maleTop, price: 699 },
    { name: "Relaxed Fit Polo Shirt", category: "Men", subCategory: "TopWear", styleCategory: "Casual", pool: img.maleTop, price: 899 },
    { name: "Cargo Jogger Pants", category: "Men", subCategory: "BottomWear", styleCategory: "Casual", pool: img.maleBottom, price: 1199 },
    { name: "Baggy Skater Denim Jeans", category: "Men", subCategory: "BottomWear", styleCategory: "Casual", pool: img.maleBottom, price: 1299 },

    // Party
    { name: "Sequin Embroidered Blazer", category: "Men", subCategory: "TopWear", styleCategory: "Party", pool: img.maleTop, price: 2999 },
    { name: "Slim Fit Satin Shirt", category: "Men", subCategory: "TopWear", styleCategory: "Party", pool: img.maleTop, price: 1599 },
    { name: "Stretch Slim Trousers", category: "Men", subCategory: "BottomWear", styleCategory: "Party", pool: img.maleBottom, price: 1799 },

    // Wedding
    { name: "Royal Bandhgala Suit", category: "Men", subCategory: "TopWear", styleCategory: "Wedding", pool: img.maleTop, price: 5999 },
    { name: "Sherwani with Churidar", category: "Men", subCategory: "BottomWear", styleCategory: "Wedding", pool: img.maleBottom, price: 7499 },
    { name: "Embroidered Nehru Jacket", category: "Men", subCategory: "TopWear", styleCategory: "Wedding", pool: img.maleTop, price: 3999 },

    // Ethnic
    { name: "Printed Kurta with Pyjama", category: "Men", subCategory: "TopWear", styleCategory: "Ethnic", pool: img.maleTop, price: 1299 },
    { name: "Cotton Dhoti Kurta Set", category: "Men", subCategory: "BottomWear", styleCategory: "Ethnic", pool: img.maleBottom, price: 1499 },
    { name: "Pathani Suit", category: "Men", subCategory: "TopWear", styleCategory: "Ethnic", pool: img.maleTop, price: 1799 },

    // Formal
    { name: "Tailored Navy Suit Jacket", category: "Men", subCategory: "TopWear", styleCategory: "Formal", pool: img.maleTop, price: 4499 },
    { name: "Oxford Formal Dress Shirt", category: "Men", subCategory: "TopWear", styleCategory: "Formal", pool: img.maleTop, price: 1199 },
    { name: "Slim Fit Formal Trousers", category: "Men", subCategory: "BottomWear", styleCategory: "Formal", pool: img.maleBottom, price: 1599 },

    // Gym
    { name: "Dri-Fit Training T-Shirt", category: "Men", subCategory: "TopWear", styleCategory: "Gym", pool: img.maleTop, price: 799 },
    { name: "Compression Gym Shorts", category: "Men", subCategory: "BottomWear", styleCategory: "Gym", pool: img.maleBottom, price: 999 },
    { name: "Mesh Performance Tank", category: "Men", subCategory: "TopWear", styleCategory: "Gym", pool: img.maleTop, price: 649 },

    // Nightwear
    { name: "Cotton Pyjama Set", category: "Men", subCategory: "BottomWear", styleCategory: "Nightwear", pool: img.maleBottom, price: 899 },
    { name: "Comfort Lounge Shirt", category: "Men", subCategory: "TopWear", styleCategory: "Nightwear", pool: img.maleTop, price: 749 },

    // Winter
    { name: "Oversized Streetwear Puffer", category: "Men", subCategory: "WinterWear", styleCategory: "Winter", pool: img.maleWinter, price: 3499 },
    { name: "Gorpcore Windbreaker Jacket", category: "Men", subCategory: "WinterWear", styleCategory: "Winter", pool: img.maleWinter, price: 2999 },
    { name: "Varsity Letterman Jacket", category: "Men", subCategory: "WinterWear", styleCategory: "Winter", pool: img.maleWinter, price: 2499 },
    { name: "Chunky Cable Knit Sweater", category: "Men", subCategory: "WinterWear", styleCategory: "Winter", pool: img.maleWinter, price: 1799 },

    // ═══════════════════════════════════════════
    //  WOMEN
    // ═══════════════════════════════════════════

    // Casual
    { name: "Breezy Linen Co-ord Set", category: "Women", subCategory: "TopWear", styleCategory: "Casual", pool: img.femaleTop, price: 1399 },
    { name: "Relaxed Fit Crop Top", category: "Women", subCategory: "TopWear", styleCategory: "Casual", pool: img.femaleTop, price: 699 },
    { name: "High-Rise Mom Jeans", category: "Women", subCategory: "BottomWear", styleCategory: "Casual", pool: img.femaleBottom, price: 1499 },
    { name: "Flowy Palazzo Pants", category: "Women", subCategory: "BottomWear", styleCategory: "Casual", pool: img.femaleBottom, price: 999 },

    // Party
    { name: "Sequin Mini Dress", category: "Women", subCategory: "TopWear", styleCategory: "Party", pool: img.femaleTop, price: 2499 },
    { name: "Off-Shoulder Ruffle Top", category: "Women", subCategory: "TopWear", styleCategory: "Party", pool: img.femaleTop, price: 1299 },
    { name: "Bodycon Satin Skirt", category: "Women", subCategory: "BottomWear", styleCategory: "Party", pool: img.femaleBottom, price: 1599 },

    // Wedding
    { name: "Embroidered Bridal Lehenga", category: "Women", subCategory: "TopWear", styleCategory: "Wedding", pool: img.femaleTop, price: 12999 },
    { name: "Pearl Embellished Saree", category: "Women", subCategory: "TopWear", styleCategory: "Wedding", pool: img.femaleTop, price: 8999 },
    { name: "Designer Anarkali Suit", category: "Women", subCategory: "TopWear", styleCategory: "Wedding", pool: img.femaleTop, price: 5999 },

    // Ethnic
    { name: "Printed Lucknowi Kurti", category: "Women", subCategory: "TopWear", styleCategory: "Ethnic", pool: img.femaleTop, price: 899 },
    { name: "Handloom Cotton Saree", category: "Women", subCategory: "TopWear", styleCategory: "Ethnic", pool: img.femaleTop, price: 2499 },
    { name: "Bandhani Sharara Set", category: "Women", subCategory: "BottomWear", styleCategory: "Ethnic", pool: img.femaleBottom, price: 1999 },

    // Formal
    { name: "Tailored Blazer & Trousers", category: "Women", subCategory: "TopWear", styleCategory: "Formal", pool: img.femaleTop, price: 3999 },
    { name: "Pencil Skirt with Blouse", category: "Women", subCategory: "BottomWear", styleCategory: "Formal", pool: img.femaleBottom, price: 1799 },
    { name: "Collared Formal Shirt", category: "Women", subCategory: "TopWear", styleCategory: "Formal", pool: img.femaleTop, price: 1099 },

    // Western
    { name: "Denim Jacket & Shorts Set", category: "Women", subCategory: "TopWear", styleCategory: "Western", pool: img.femaleTop, price: 2199 },
    { name: "Floral Wrap Midi Dress", category: "Women", subCategory: "TopWear", styleCategory: "Western", pool: img.femaleTop, price: 1699 },
    { name: "Ribbed Tube Top", category: "Women", subCategory: "TopWear", styleCategory: "Western", pool: img.femaleTop, price: 799 },
    { name: "Wide Leg Linen Pants", category: "Women", subCategory: "BottomWear", styleCategory: "Western", pool: img.femaleBottom, price: 1299 },

    // Nightwear
    { name: "Satin Sleep Set", category: "Women", subCategory: "TopWear", styleCategory: "Nightwear", pool: img.femaleTop, price: 1499 },
    { name: "Cotton Pyjama & Tank", category: "Women", subCategory: "BottomWear", styleCategory: "Nightwear", pool: img.femaleBottom, price: 899 },

    // Winter
    { name: "Belted Woolen Coat", category: "Women", subCategory: "WinterWear", styleCategory: "Winter", pool: img.femaleWinter, price: 4499 },
    { name: "Faux Fur Puffer Jacket", category: "Women", subCategory: "WinterWear", styleCategory: "Winter", pool: img.femaleWinter, price: 3499 },
    { name: "Turtleneck Knit Sweater", category: "Women", subCategory: "WinterWear", styleCategory: "Winter", pool: img.femaleWinter, price: 1999 },
    { name: "Quilted Bomber Jacket", category: "Women", subCategory: "WinterWear", styleCategory: "Winter", pool: img.femaleWinter, price: 2799 },

    // ═══════════════════════════════════════════
    //  KIDS
    // ═══════════════════════════════════════════

    // Casual
    { name: "Cartoon Print Cotton Tee", category: "Kids", subCategory: "TopWear", styleCategory: "Casual", pool: img.kidsTop, price: 449 },
    { name: "Denim Bib Overall", category: "Kids", subCategory: "BottomWear", styleCategory: "Casual", pool: img.kidsBottom, price: 799 },
    { name: "Colourblock Hoodie", category: "Kids", subCategory: "TopWear", styleCategory: "Casual", pool: img.kidsTop, price: 899 },
    { name: "Jogger Track Pants", category: "Kids", subCategory: "BottomWear", styleCategory: "Casual", pool: img.kidsBottom, price: 649 },

    // Party
    { name: "Velvet Party Dress", category: "Kids", subCategory: "TopWear", styleCategory: "Party", pool: img.kidsTop, price: 1299 },
    { name: "Embroidered Shirt", category: "Kids", subCategory: "TopWear", styleCategory: "Party", pool: img.kidsTop, price: 999 },
    { name: "Pleated Festive Skirt", category: "Kids", subCategory: "BottomWear", styleCategory: "Party", pool: img.kidsBottom, price: 749 },

    // Wedding
    { name: "Mini Sherwani Set", category: "Kids", subCategory: "TopWear", styleCategory: "Wedding", pool: img.kidsTop, price: 2499 },
    { name: "Lehenga Choli Set", category: "Kids", subCategory: "TopWear", styleCategory: "Wedding", pool: img.kidsTop, price: 1999 },
    { name: "Dhoti Kurta Set", category: "Kids", subCategory: "BottomWear", styleCategory: "Wedding", pool: img.kidsBottom, price: 1299 },

    // School
    { name: "School Uniform Shirt", category: "Kids", subCategory: "TopWear", styleCategory: "School", pool: img.kidsTop, price: 499 },
    { name: "Navy Blue School Trousers", category: "Kids", subCategory: "BottomWear", styleCategory: "School", pool: img.kidsBottom, price: 599 },
    { name: "School Pinafore Dress", category: "Kids", subCategory: "TopWear", styleCategory: "School", pool: img.kidsTop, price: 699 },

    // Nightwear
    { name: "Dino Print Kids PJs", category: "Kids", subCategory: "BottomWear", styleCategory: "Nightwear", pool: img.kidsBottom, price: 649 },
    { name: "Star Print Night Suit", category: "Kids", subCategory: "TopWear", styleCategory: "Nightwear", pool: img.kidsTop, price: 799 },

    // Winter
    { name: "Puffer Down Kids Jacket", category: "Kids", subCategory: "WinterWear", styleCategory: "Winter", pool: img.kidsWinter, price: 1799 },
    { name: "Fleece Lined Tracksuit", category: "Kids", subCategory: "WinterWear", styleCategory: "Winter", pool: img.kidsWinter, price: 1499 },
    { name: "Woolen Kids Hoodie Coat", category: "Kids", subCategory: "WinterWear", styleCategory: "Winter", pool: img.kidsWinter, price: 1999 },
];

// Build final product docs — each pool gets a pointer so image1 is always unique
const buildProducts = () => {
    // Track how many times each pool array has been used
    const poolCursor = new Map();
    const usedImage1 = new Set();
    const docs = [];

    products.forEach((p) => {
        const pool = p.pool;
        const cursor = poolCursor.get(pool) || 0;

        // Find next image in pool that hasn't been used as image1
        let idx = cursor;
        while (idx < pool.length && usedImage1.has(pool[idx])) idx++;

        if (idx >= pool.length) return; // pool exhausted — skip this product

        usedImage1.add(pool[idx]);
        poolCursor.set(pool, idx + 1);

        const n = pool.length;
        docs.push({
            name: p.name,
            image1: pool[idx],
            image2: pool[(idx + 1) % n],
            image3: pool[(idx + 2) % n],
            image4: pool[(idx + 3) % n],
            description: getR(descriptions),
            price: p.price,
            category: p.category,
            subCategory: p.subCategory,
            styleCategory: p.styleCategory,
            sizes: ['S', 'M', 'L', 'XL'],
            date: Date.now() - Math.floor(Math.random() * 10000000000),
            bestseller: Math.random() > 0.7,
        });
    });

    return docs;
};

const seedDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URL);
        console.log("Connected successfully.");

        console.log("Clearing old products...");
        await Product.deleteMany({});
        console.log("Database cleared.");

        const docs = buildProducts();
        await Product.insertMany(docs);
        console.log(`✅ ${docs.length} products inserted with styleCategory support!`);

        process.exit(0);
    } catch (err) {
        console.error("Error seeding database:", err);
        process.exit(1);
    }
};

seedDB();
