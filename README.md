## Generic Music Search App
GMSA or Generic Music Search App is just that, a music searching app that uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api) to search for Artists, Albums, and Tracks.

## Prerequisites
 * Chrome/Firefox/Safari/Edge >= Latest major versions or Developer versions
 * NodeJS >= 18.0.0
 * npm >= 9.0.0
 * MongoDB >= 5.5.0

## Getting Started
The project needs a proper `.env` file filled out. You can use the `.env.dist` as the base file and simply rename it to `.env` but information is still needed to be filled.

 * `MUSIC_ID` is the Spotify API ID
 * `MUSIC_SECRET` is the Spotify API secret key
 * `REDIRECT_URI` is the redirect that the login goes to after Spotify, `'http://localhost:8001/spotify/v1/callback` is an example
 * `API_URL` ...
 * `DATABASE_URL` is the mongodb url, e.g. `mongodb://127.0.0.1/library`

Leave `PORT` and `PORT_GUI` intact.

To install and start the server-side:

	cd server
	npm i
	npm run watch

Open another instance of command prompt to install and start the client-side:

	cd client
	npm i
	npm run start

## Links
When running starting the frontend and backend services, the following urls will be accessible:
 * http://localhost:8000 - Web GUI
 * http://localhost:8001/spotify/v1 - Backend API
 * http://localhost:8001/spotify/v1/status - Status of authentication, if true - has access, otherwise no access.
 * http://localhost:8001/spotify/v1/login - requests new auth from Spotify
 * http://localhost:8001/spotify/v1/search - Search the Spotify API