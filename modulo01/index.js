const express = require("express");

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = {"name": "Bruno", "email": "bruno.bortagaray@objectedge.com"}

const users = ["Bruno", "Panga", "Marco", "Marcello"];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Metodo: ${req.method}; URL: ${req.url};`);
  next();

  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "Campo 'name' é obrigatorio!" });
  }
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: "Usuario nao existe!" });
  }

  req.user = user;
  return next();
}

server.get("/users/", (req, res) => {
  res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json();
});

server.listen(3000, () => {
  console.log("Ouvindo na porta 3000!");
});
