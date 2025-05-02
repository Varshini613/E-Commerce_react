const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MySQL connection using XAMPP
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user_db", // Your created database
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

// Register API
app.post("/api/register", (req, res) => {
  const { name, email, password, role } = req.body;
  const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, password, role], (err, result) => {
    if (err) {
      console.error("Error during registration:", err);
      return res.status(500).send("Error registering user");
    }
    res.status(200).send("User registered successfully!");
  });
});

// Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).send("Error logging in");
    }

    if (results.length > 0) {
      const user = results[0];
      res.status(200).send({
        message: "Login successful!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});

// ✅ Product Insert API (with vendor_name matching the DB column name)
app.post("/api/products", (req, res) => {
    const {
      vendorName,
      name,
      description,
      price,
      brand,
      category,
      discount,
      image,
      additionalImages = [],
      videoUrl,
      extraInfo
    } = req.body;
  
    console.log("Received product:", req.body); // 🛠 Debug log
  
    const query = `
      INSERT INTO products 
      (vendor_name, name, description, price, brand, category, discount, image, 
      additional_image1, additional_image2, video_url, extra_info)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [
      vendorName || '',
      name || '',
      description || '',
      price || 0,
      brand || '',
      category || '',
      discount || 0,
      image || '',
      additionalImages[0] || '',
      additionalImages[1] || '',
      videoUrl || '',
      extraInfo || ''
    ];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      res.status(201).json({ message: "Product added", id: result.insertId });
    });
  });
  // ✅ Get all registered users
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});
// ✅ Get all products
app.get("/api/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Database error" });
    }
    // console.log("Fetched from DB:", results); // ✅ DEBUG
    res.status(200).json(results);
  });
});

// Example: GET /api/products?category=Stationary
app.get('/api/products', async (req, res) => {
  const category = req.query.category;

  let query = 'SELECT * FROM products';
  const params = [];

  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }

  try {
    const [rows] = await db.execute(query, params); // Adjust for your DB library
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const {
    vendor_name, name, description, price, brand, category, discount,
    image, additional_image1, additional_image2, video_url, extra_info
  } = req.body;

  const query = `
    UPDATE products SET 
      vendor_name = ?, name = ?, description = ?, price = ?, brand = ?, category = ?, discount = ?, 
      image = ?, additional_image1 = ?, additional_image2 = ?, video_url = ?, extra_info = ?
    WHERE id = ?
  `;

  db.query(query, [
    vendor_name, name, description, price, brand, category, discount,
    image, additional_image1, additional_image2, video_url, extra_info, id
  ], (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).send("Error updating product");
    }
    res.send({ message: "Product updated successfully" });
  });
});


// PUT /api/users/:id
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  const query = "UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?";
  db.query(query, [name, email, password, role, id], (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).send("Error updating user");
    }
    res.send({ message: "User updated successfully" });
  });
});

// ✅ DELETE product by ID
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  Product.deleteOne({ _id: productId })
    .then(() => {
      res.status(200).send('Product deleted successfully');
    })
    .catch((err) => {
      console.error('Error deleting product:', err);
      res.status(500).send('Error deleting product');
    });
});


// ✅ DELETE user by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  User.deleteOne({ _id: userId })
    .then(() => {
      res.status(200).send('User deleted successfully');
    })
    .catch((err) => {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user');
    });
});


// Example login route (Node.js / Express)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.query("SELECT * FROM users WHERE email = ?", [email]);

  if (user && user[0].password === password) {
    // Don't return the password!
    const userData = {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
    };

    res.json(userData); // Return full user data
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

    // Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
