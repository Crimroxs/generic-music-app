require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const musicRoutes = require('./routes/music');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use('/spotify/v1', musicRoutes);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connection Established."));

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});