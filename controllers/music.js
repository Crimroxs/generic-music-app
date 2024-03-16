const axios = require("axios");
const randomstring = require("randomstring");
const querystring = require("querystring");

const { PORT_GUI, MUSIC_ID, MUSIC_SECRET, REDIRECT_URI, API_URL } = process.env;
const Token = require("../models/music");
const now = new Date().getTime();

const auth_token = Buffer.from(`${MUSIC_ID}:${MUSIC_SECRET}`, "utf-8").toString("base64");

const login = (req, res) => {
	try {
		const state = randomstring.generate(16);
		res.cookie("spotify_auth", state);

		const scope = "user-read-private user-read-email";
		const queryParams = querystring.stringify({
			MUSIC_ID: MUSIC_ID,
			response_type: "code",
			redirect_uri: REDIRECT_URI,
			scope: scope,
			state: state,
		});
		res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
	} catch (error) {
		console.error(error);
	}
};

const callback = async (req, res) => {
	try {
		const { code } = req.query;

		const response = await axios({
			method: "post",
			url: API_URL,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${auth_token}`,
			},
			params: {
				grant_type: "authorization_code",
				code,
				redirect_uri: REDIRECT_URI,
			},
		});

		let jwt = new Token(response.data);
		jwt.expires_in = new Date(new Date().setHours(new Date().getHours() + 1));
		jwt.save();
		
		if (jwt) {
			const queryParams = querystring.stringify({
				access_token: jwt.access_token,
				refresh_token: jwt.refresh_token,
				expires_in: jwt.expires_in,
			}); 
			return res.redirect(`http://localhost:${PORT_GUI}/?${queryParams}`)
		}
		return res.status(200).json({ message: "Callback", jwt });
	} catch (error) {
		console.error(error);
	}
};

const status = async (req, res) => {
	const jwt = Token.findOne()
		.where("expires_in")
		.gte(now)
		.exec()
		.then((jwt) => {
			if (jwt && jwt.expires_in > now) {
				res.json({ status: "true" });
			} else {
				res.json({ status: "false" });
			}
		});
};

const logout = async (req, res) => {
	return res.status(200).json({ message: "You were logged out." });
};

const refresh = async (req, res) => {
	const { refresh_token } = req.query;
	const response = await axios({
		method: "post",
		url: API_URL,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${auth_token}`,
		},
		params: {
			grant_type: "refresh_token",
			refresh_token: refresh_token,
		},
	});

	return res.status(200).json({ message: "Token Refresh.", data: response.data });
};

const search = async (req, res) => {
	const jwt = Token.findOne()
		.where("expires_in")
		.gte(now)
		.exec()
		.then((jwt) => {
			const { access_token } = jwt;
			axios({
				method: "GET",
				url: "https://api.spotify.com/v1/search",
				params: {
					type: "album,artist,track",
					q: req.query.q,
					limit: 3,
				},
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
			}).then(({ data }) => {
				res.json(data);
			}).catch((error) => {
				res.json(error);
			});
		}).catch((error) => {
			console.error("No valid JWT was found.", error);
		});
};

module.exports = {
	login, callback, status, logout, refresh, search
}