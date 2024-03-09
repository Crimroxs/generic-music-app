require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.listen(8001);