const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//const express = require('express');
//const app = express();
const swaggerUi = require("swagger-ui-express");

// Define a list of users
const users = [
  { id: 1, name: "John Doe", email: "johndoe@example.com" },
  { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
];

// Middleware to parse JSON request body
app.use(express.json());

// Import the Swagger configuration
//const swaggerUi = require("swagger-ui-express");
//const swaggerSpec = require("./swagger");
//const swaggerSpec = require("./swagger");

// Middleware to serve the Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define the Swagger documentation for the /api/users route
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of user objects.
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: An error occurred
 */
app.get("/api/users", (req, res) => {
  res.json({ users });
});

// Get a user by ID
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Get a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: User not found
 */
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ user });
});

// Create a new user
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user and add them to the list.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created
 */
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
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update a user's information by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated
 *       '404':
 *         description: User not found
 */
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
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User deleted
 *       '404':
 *         description: User not found
 */
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
