const express = require("express");

const server = express();

// Query params = ?teste=1
// Route params = /users/1
// Request body = {"name": "Bruno", "email": "bruno.bortagaray@objectedge.com"}

const users = ["Bruno", "Marco", "Marcello"];

server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  res.json({ name: users[index] });
});

server.listen(3000, () => {
  console.log("Ouvindo na porta 3000!");
});
