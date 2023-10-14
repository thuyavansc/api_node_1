const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Define a list of users
const users = [
  { id: 1, name: "John Doe", email: "johndoe@example.com" },
  { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
];

// Middleware to parse JSON request body
app.use(express.json());

// Get all users
app.get("/api/users", (req, res) => {
  res.json({ users });
});

// Get a user by ID
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ user });
});

// Create a new user
app.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update a user by ID
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.json(user);
});

// Delete a user by ID
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users.splice(index, 1);
  res.json({ message: "User deleted" });
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
