//___________________
//Dependencies
//___________________
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
const cors = require("cors");
const theSchema = require("./models/theSchema.js");

app.use(express.json());
app.use(cors());
require("dotenv").config();

// const passwordDb = require("./models/passwordDb.js"); // import data to server
// const schema = require("./models/passwordSchema.js"); // import Schema to server
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static("public"));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
//app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

app.get("/", (req, res) => {
	theSchema.find({}, (err, findCard) => {
		res.json(findCard);
	});
});

app.post("/create", (req, res) => {
	theSchema.create(req.body, (err, createdCard) => {
		res.json(createdCard);
	});
});

app.patch("/update/:id", (req, res) => {
	theSchema.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, updateCard) => {
			res.json(updateCard);
		}
	);
});

app.delete("/delete/:id", (req, res) => {
	theSchema.findByIdAndRemove(req.params.id, (err, deleteCard) => {
		res.json(deleteCard);
	});
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("Listening on port:", PORT));

// TO RUN LOCAL, UNCOMMENT BELLOW

// mongoose.connect('mongodb://localhost:27017/bugs')
// mongoose.connection.once('open', () => {
//     console.log('connected to mongodb...');
// })
// app.listen(3000, () => {
//   console.log('listening...');
// })
