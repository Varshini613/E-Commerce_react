// Delay (throttling)
// ✅ User-Agent rotation
// ✅ Basic in-memory caching
// ✅ Timeout and safe request handler
// ✅ Clear logging and fallbacks



const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

// Delay function to slow down requests (throttling)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// User-Agent rotation
const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  "Mozilla/5.0 (Linux; Android 10; SM-G975F)",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X)",
  "Mozilla/5.0 (X11; Linux x86_64)",
];
const getRandomUserAgent = () => userAgents[Math.floor(Math.random() * userAgents.length)];

// Cache to avoid re-scraping too often
const cache = {
  products: null,
  timestamp: 0,
  ttl: 60 * 60 * 1000 // 1 hour
};

// List of biscuits to search
const biscuitsList = [
  "Britannia JimJam Pops - Crunchy Open Cookie with Vanilla crème and Jammy",
  "Cadbury Chocobakes ChocLayered Cakes,(Cadbury Family Pack 200g)",
  "Wheafree Multigrain Gluten-Free Healthy Sweet and Salty (Namkeen) Jeera",
  "Sunfeast Dark Fantasy Dark Fantasy Choco Fills,Filled cookies 300g",
  "Sunfeast Farmlite 5 Seed Digestive Biscuit | High Fibre | Goodness of 5 Power Seeds & Wheat Fibre",
"Britannia Good Day Cashew Cookies,1000g",
"Karachi Bakery Osmania Biscuits, 400g",
"Unibic Cashew and Badam Cookies, 450g (Pack of 2)",
"Britannia Nutri Choice Digestive & sugarfree, 1Kg",
"Britannia The Original Bourbon - Creme Biscuit with Chocolate",
"Unibic Choco Nut Cookies 1kg",
"Sunfeast Dark Fantasy Yumfills Whoopie Pie",
"Parle Hide & Seek Chocolate Cookies",
"Cadbury Oreo Chocolate Biscuit",
"Sunfeast Marie Light Active Biscuit",
"Sunfeast Dark Fantasy Bourbon",
"Britannia Good Day Choco Chip Cookies",
"Parle G Original Gluco Biscuits",
"Britannia Milk Bikis Milk Cream Biscuits",
"Britannia Vita Marie Gold Biscuits",
"Sunfeast Mom's Magic",
"Britannia 50-50 Maska Chaska Biscuits",
"Karachi Fruit Biscuit - Premium",
"Diabexy Almond Cookies/Biscuits",
"Parle Krack Jack Biscuit",
"Storio Toys Rechargeable Educational Learning Talking Flash Cards ",
"Storio 3D Baby Car Toy with 360 Degree Rotation",
"Storio Rubber Colorful Floating Baby Toys",
"Wembley DIY Rotating Musical Toys",
"Wembley Rechargeable Octopus Crawling Musical Baby Toy",
"GRAPHENE Spinning Top Magic Toy",
"Graphene Colorful Double-Sided Flash Cards",
"Storio Cute Swimming Toy",
"Storio Cute Duck Swimming Toy",
"Wembley Crawling Crab Baby Toy ",
"Storio Toy Octopus ",

];

// Safe axios request with timeout
const safeRequest = async (url, headers = {}) => {
  try {
    const res = await axios.get(url, {
      headers,
      timeout: 8000, // 8 seconds
    });
    return res.data;
  } catch (err) {
    console.warn("❌ Request failed:", url);
    return null;
  }
};

app.get('/api/products', async (req, res) => {
  try {
    const now = Date.now();
    if (cache.products && (now - cache.timestamp < cache.ttl)) {
      console.log("✅ Serving from cache");
      return res.json(cache.products);
    }

    const finalProducts = [];

    for (const biscuit of biscuitsList) {
      await delay(2000); // Delay 2 sec per product

      const product = { name: biscuit, amazon: null, flipkart: null };

      // === AMAZON ===
      try {
        const amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(biscuit)}`;
        const amazonHtml = await safeRequest(amazonUrl, {
          "User-Agent": getRandomUserAgent(),
        });

        if (amazonHtml) {
          const $ = cheerio.load(amazonHtml);
          $(".s-result-item").each((i, el) => {
            const name = $(el).find("h2 span").text().trim();
            const price = $(el).find(".a-price .a-offscreen").first().text().trim();
            const mrp = $(el).find(".a-price.a-text-price .a-offscreen").first().text().trim() || "MRP Not Available";
            const image = $(el).find("img.s-image").attr("src") || "";
            const link = "https://www.amazon.in" + ($(el).find("a.a-link-normal").attr("href") || "");

            if (name && name.toLowerCase().includes(biscuit.toLowerCase().split(" ")[0])) {
              product.amazon = { name, price, mrp, image, link, timestamp: new Date().toISOString() };
              return false; // stop loop
            }
          });
        }
      } catch (err) {
        console.log(`❌ Amazon scrape error for: ${biscuit}`);
      }

      // === FLIPKART ===
      try {
        const flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(biscuit)}`;
        const flipHtml = await safeRequest(flipkartUrl, {
          "User-Agent": getRandomUserAgent(),
        });

        if (flipHtml) {
          const $$ = cheerio.load(flipHtml);
          $$('._1AtVbE').each((i, el) => {
            const name = $$(el).find("._4rR01T, .s1Q9rs").text().trim();
            const price = $$(el).find("._30jeq3").first().text().trim();
            const mrp = $$(el).find("._3I9_wc").first().text().trim() || "MRP Not Available";
            const image = $$(el).find("img").attr("src") || "";
            const link = "https://www.flipkart.com" + ($$(el).find("a").attr("href") || "");

            if (name && name.toLowerCase().includes(biscuit.toLowerCase().split(" ")[0])) {
              product.flipkart = { name, price, mrp, image, link, timestamp: new Date().toISOString() };
              return false; // stop loop
            }
          });
        }
      } catch (err) {
        console.log(`❌ Flipkart scrape error for: ${biscuit}`);
      }

      finalProducts.push(product);
    }

    // Save to cache
    cache.products = finalProducts;
    cache.timestamp = Date.now();

    res.json(finalProducts);
  } catch (error) {
    console.error('🚨 Server error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});