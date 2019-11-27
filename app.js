const express = require("express");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

// --- MULTER SETUP --- //

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

// Initial Upload
const upload = multer({
	storage: storage
}).single("file");

// --- APP SETUP --- //

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
			console.log("Uploaded File Description:", req.body.name);
			console.log("Uploaded File Data:", req.file);
			res.send("File was uploaded! Check your public/uploads directory.");
		}
	});
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
