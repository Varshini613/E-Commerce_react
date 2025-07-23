const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MySQL connection using XAMPP
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user_db",
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

// Insert Product
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
    extraInfo,
  } = req.body;

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

// Get All Users
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

// Get All Products (with optional category filter)
app.get("/api/products", (req, res) => {
  const category = req.query.category;
  let query = "SELECT * FROM products";
  const params = [];

  if (category) {
    query += " WHERE category = ?";
    params.push(category);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});

// Update Product
app.put("/api/products/:id", (req, res) => {
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
  ], (err) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).send("Error updating product");
    }
    res.send({ message: "Product updated successfully" });
  });
});

// Update User
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  const query = "UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?";
  db.query(query, [name, email, password, role, id], (err) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).send("Error updating user");
    }
    res.send({ message: "User updated successfully" });
  });
});

// Delete Product by ID
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";

  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.status(500).send("Error deleting product");
    }
    res.send("Product deleted successfully");
  });
});

// Delete User by ID
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";

  db.query(query, [id], (err) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).send("Error deleting user");
    }
    res.send("User deleted successfully");
  });
});

app.post("/api/orders", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    address,
    dispatchOption,
    shippingCost,
    totalPrice,
    paymentMethod,
    cartItems,
  } = req.body;

  const orderQuery = `
    INSERT INTO orders (first_name, last_name, email, address, dispatch_option, shipping_cost, total_price, payment_method)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    orderQuery,
    [firstName, lastName, email, address, dispatchOption, shippingCost, totalPrice, paymentMethod],
    (err, orderResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error inserting order" });
      }

      const orderId = orderResult.insertId;

      const itemValues = cartItems.map((item) => [orderId, item.name, item.quantity, item.price]);
      const itemsQuery = "INSERT INTO order_items (order_id, product_name, quantity, price) VALUES ?";

      db.query(itemsQuery, [itemValues], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error inserting order items" });
        }

        res.json({ message: "Order placed successfully" });
      });
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
