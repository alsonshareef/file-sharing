const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

// Set Storage Engine
const storage = multer.diskStorage({
	destination: "./public/uploads/",
	filename: (req, file, callback) => {
		callback(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	}
});

// Upload
const upload = multer({
	storage: storage
}).single("file");

// INIT
const app = express();
const port = 3000;
app.set("view engine", "ejs");

// --- ROUTES

// GET
app.get("/", (req, res) => res.render("index"));

// POST
app.post("/upload", (req, res) => {
	upload(req, res, err => {
		if (err) {
			res.render("index", {
				msg: err
			});
		} else {
			console.log(req.file);
			res.send("test");
		}
	});
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
