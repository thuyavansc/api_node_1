const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Define a list of users
const users = [
  { id: 1, name: "John Doe", email: "johndoe@example.com" },
  { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
];

// Define an API endpoint that returns the list of users
app.get("/api/users", (req, res) => {
  res.json({ users });
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
