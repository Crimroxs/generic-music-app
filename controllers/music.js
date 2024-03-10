const axios = require("axios");
const randomstring = require("randomstring");
const querystring = require("querystring");

const { PORT_GUI, MUSIC_ID, MUSIC_SECRET, REDIRECT_URI, API_URL } = process.env;
const Token = require("../models/music");
const now = new Date().getTime();

const auth_token = Buffer.from(`${MUSIC_ID}:${MUSIC_SECRET}`, "utf-8").toString("base64");

const login = (req, res) => {
};

const status = async (req, res) => {
};

const logout = async (req, res) => {
};

const refresh = async (req, res) => {
};

const search = async (req, res) => {
};

module.exports = {
	login, callback, status, logout, refresh, search
}