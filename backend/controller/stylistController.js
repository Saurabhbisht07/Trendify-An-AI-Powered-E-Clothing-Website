import { GoogleGenerativeAI } from "@google/generative-ai";

// ── Comprehensive rule-based fashion engine ───────────────────────────────
const getRuleBasedAnswer = (prompt) => {
    const p = prompt.toLowerCase();

    // Kids
    if (p.includes("kid") || p.includes("child") || p.includes("baby") || p.includes("toddler") || p.includes("boy") || p.includes("girl")) {
        const responses = [
            "For kids, go with bright cotton tees paired with denim or cargo shorts — comfortable and cool! 🧒 Soft fabrics like jersey and fleece are perfect for active little ones. Add colourful sneakers to complete the look! 👟",
            "Kids look adorable in printed co-ord sets or dungarees! 🎨 For school, a crisp collared shirt with neat trousers works great. Always prioritize comfort with breathable, stretchy fabrics. ✨",
            "For girls, floral dresses with leggings are a timeless combo! 🌸 For boys, quirky graphic tees with joggers keep things fun and fuss-free. Velcro shoes make mornings easier too! 😊",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Occasion-based
    if (p.includes("wedding") || p.includes("shaadi") || p.includes("sherwani") || p.includes("lehenga") || p.includes("bridal")) {
        return "For weddings, men can never go wrong with a well-fitted sherwani or bandhgala suit in rich jewel tones! 💍 Women should consider a silk saree or embroidered lehenga — opt for deep reds, golds, or emerald greens for maximum impact. ✨";
    }
    if (p.includes("beach") || p.includes("summer") || p.includes("vacation") || p.includes("holiday")) {
        return "For a beach vibe, a linen shirt in white or pastel paired with relaxed shorts and slides is perfect! 🏖️ A light kimono or open overshirt adds that breezy resort look. Don't forget a straw hat — it elevates everything! 😎";
    }
    if (p.includes("date") || p.includes("dinner") || p.includes("romantic")) {
        return "For a date night, a slim-fit black shirt tucked into tapered trousers with clean loafers hits just right! 🖤 Keep accessories minimal — a subtle watch is all you need. Confidence is the best outfit. 💫";
    }
    if (p.includes("party") || p.includes("club") || p.includes("night out")) {
        return "For a night out, go bold with a satin or metallic shirt paired with slim dark trousers! 🎉 Strong silhouettes and confident colours make you unforgettable. Add a cologne that lingers and you're set! ✨";
    }
    if (p.includes("office") || p.includes("work") || p.includes("professional") || p.includes("formal") || p.includes("interview")) {
        return "For office/formal looks, a fitted blazer over a crisp white shirt with chinos is a timeless power combo! 💼 Stick to navy, grey, or beige — polished and authoritative. A leather belt and clean shoes complete the look. 🏆";
    }
    if (p.includes("gym") || p.includes("workout") || p.includes("sport") || p.includes("fitness")) {
        return "For the gym, moisture-wicking shorts or joggers with a fitted performance tee are key! 💪 All-black workout sets look sleek and serious. Never skip proper athletic footwear — your performance depends on it! 🔥";
    }
    if (p.includes("ethnic") || p.includes("kurta") || p.includes("salwar") || p.includes("saree") || p.includes("sari") || p.includes("desi")) {
        return "For ethnic wear, a well-fitted kurta with churidar or palazzo pants is both stylish and traditional! 🪆 Cotton and linen kurtas in earthy tones are perfect for day events, while silk or embroidered ones elevate evening occasions. ✨";
    }

    // Season/weather
    if (p.includes("winter") || p.includes("cold") || p.includes("snow")) {
        return "For winter, layer a ribbed turtleneck under a wool overcoat in camel or charcoal — instantly premium! 🧥 Burgundy, forest green, and navy are your best colour friends this season. Don't forget a good scarf to complete the look! ❄️";
    }
    if (p.includes("monsoon") || p.includes("rain") || p.includes("rainy")) {
        return "For monsoon, stick to quick-dry fabrics like polyester blends and avoid heavy denim! 🌧️ Dark or patterned clothes hide water stains. A stylish windbreaker and waterproof sneakers are your best investment right now. ☔";
    }

    // Streetwear/trends
    if (p.includes("streetwear") || p.includes("street") || p.includes("hype") || p.includes("trend") || p.includes("gen z") || p.includes("genz")) {
        return "Right now it's all about wide-leg cargos, boxy graphic hoodies, and chunky sneakers — that's the streetwear sweet spot! 🔥 Layer a zip-up over a plain tee for that effortless layered look. Vintage-washed pieces are everywhere right now! 💪";
    }
    if (p.includes("casual") || p.includes("everyday") || p.includes("daily") || p.includes("comfy") || p.includes("comfortable")) {
        return "For a casual everyday look, an oversized graphic tee with straight-leg jeans and chunky sneakers is always a win! 👟 Throw on a baseball cap to make it effortlessly cool. Comfort and style don't have to be different things! ✌️";
    }

    // Specific garments
    if (p.includes("color") || p.includes("colour") || p.includes("what color") || p.includes("which color")) {
        return "Neutral bases — white, black, beige, and grey — are super versatile and go with everything! 🤍 For personality, try terracotta, sage green, or cobalt blue. These are trending big this season. Don't be afraid of colour! 🎨";
    }
    if (p.includes("cargo") || p.includes("trouser") || p.includes("pant") || p.includes("jeans") || p.includes("denim")) {
        return "Cargo pants are massive right now! 🔥 Wide-leg cargos with a fitted crop or tucked tee and chunky sneakers is the winning formula. For jeans, straight or barrel-leg fits are dominating — ditch the skinny jeans! 👌";
    }
    if (p.includes("hoodie") || p.includes("sweatshirt") || p.includes("sweater")) {
        return "Oversized hoodies are a wardrobe essential! 🤍 Style one with biker shorts or wide-leg joggers for cosy-chic. Muted tones like grey, cream, and dusty rose are super on-trend. Fleece-lined ones are premium comfort this winter! ✨";
    }
    if (p.includes("dress") || p.includes("skirt") || p.includes("feminine")) {
        return "Midi dresses in floral or solid earthy tones are having a huge moment! 🌸 Pair with block heels or chunky sandals for instant elevation. A wrap dress is the most universally flattering silhouette — every wardrobe needs one! ✨";
    }
    if (p.includes("jacket") || p.includes("coat") || p.includes("blazer") || p.includes("layer")) {
        return "Layering is everything this season! 🧥 A well-structured blazer over a plain tee instantly makes any look premium. For casual vibes, a bomber or denim jacket works on literally every outfit. Invest in outerwear — it carries the whole look! 💫";
    }
    if (p.includes("sneaker") || p.includes("shoe") || p.includes("footwear") || p.includes("boot")) {
        return "Chunky sneakers are still dominating — pair with almost anything for that effortless cool! 👟 For versatility, white leather sneakers go with every outfit. Boots elevate any look instantly, especially Chelsea or combat styles! 🔥";
    }
    if (p.includes("accessory") || p.includes("accessories") || p.includes("watch") || p.includes("jewellery") || p.includes("jewelry")) {
        return "Accessories make the outfit! ⌚ A minimalist watch, a simple chain necklace, and stud earrings work for almost any look. Don't over-accessorize — pick 2-3 pieces max and let them shine. Quality over quantity always wins! ✨";
    }
    if (p.includes("budget") || p.includes("cheap") || p.includes("affordable") || p.includes("price")) {
        return "Building a stylish wardrobe on a budget? Invest in 5 basics: white tee, black jeans, a neutral blazer, white sneakers, and a versatile bag! 💸 Then shop trends sparingly. Thrift stores and end-of-season sales are gold mines! 🛍️";
    }

    // Women-specific
    if (p.includes("women") || p.includes("woman") || p.includes("female") || p.includes("ladies") || p.includes("she") || p.includes("her")) {
        return "For women, a well-fitted blazer is the most powerful piece in a wardrobe — dress it up or down! 👗 Wide-leg trousers with a tucked blouse is a timeless power look. Don't underestimate the impact of a great pair of jeans and a clean white tee! ✨";
    }

    // Men-specific
    if (p.includes("men") || p.includes("man") || p.includes("male") || p.includes("guys") || p.includes("he") || p.includes("him")) {
        return "For men, a well-fitted polo or Oxford shirt is the most versatile piece — works casual or semi-formal! 👔 Chinos in beige or olive are more stylish than jeans in most situations. Grooming and shoe quality complete the picture! 💪";
    }

    // Generic rotating fallback
    const generic = [
        "The golden rule of fashion: wear what makes you feel confident! 🌟 Stick to well-fitted pieces and mix textures for an effortlessly elevated look. Try a linen-cotton blend for a premium feel without trying too hard! ✨",
        "A great base outfit is a neutral tee, slim trousers, and clean white sneakers — build from there! 👟 Accessories like a watch or cap can completely transform a simple look into something premium. 🔥",
        "Layering is the secret to looking stylish without effort! 🧥 Try an unbuttoned shirt over a plain tee, or a bomber jacket with a basic outfit. Depth and texture make any look 10x better! 💫",
        "Monochromatic outfits are the easiest way to look put-together — pick one colour family and stick to it! 🤍 An all-beige or all-black look is effortlessly chic and always works. Add one contrasting accessory to keep it interesting. ✨",
        "Good fit beats expensive every time! 👌 A basic tee that fits perfectly looks better than a premium oversized one. Get your key pieces tailored — it's cheaper than you think and makes a massive difference. 🏆",
    ];
    return generic[Math.floor(Math.random() * generic.length)];
};

export const getStylistAdvice = async (req, res) => {
    try {
        const { prompt } = req.body;
        
        // Try Gemini API first if key exists
        if (process.env.GEMINI_API_KEY) {
            try {
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const systemPrompt = "You are an expert fashion stylist for a modern clothing brand called Trendify. You give short, trendy, and highly helpful fashion advice directly to customers. Recommend general types of clothing pieces. Keep responses under 3 sentences. Be friendly and use emojis.";
                const finalPrompt = `${systemPrompt}\nCustomer says: ${prompt}`;
                const result = await model.generateContent(finalPrompt);
                const response = result.response.text();
                return res.status(200).json({ success: true, answer: response });
            } catch (apiError) {
                console.log("Gemini API failed, using smart fallback:", apiError.message);
                // Fall through to rule-based system
            }
        }

        // Smart rule-based fallback
        const answer = getRuleBasedAnswer(prompt);
        return res.status(200).json({ success: true, answer });

    } catch (error) {
        console.error("Stylist error:", error);
        res.status(500).json({ success: false, message: "Sorry, something went wrong. Please try again!" });
    }
}
