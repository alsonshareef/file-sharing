const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

// INIT
const app = express();
const port = 3000;
app.set("view engine", "ejs");

// --- ROUTES

// GET
app.get("/", (req, res) => res.render("index"));

// POST
app.post("/upload", (req, res) => {
	res.send("POST request to /upload");
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
