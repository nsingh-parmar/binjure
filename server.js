const path = require("path");
const express = require("express");
// const cors = require("cors");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middleware = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

// server.use(cors());
server.use("/api", middleware, router);
server.use(express.static(path.join(__dirname, "build")));

server.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});