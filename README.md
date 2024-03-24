## Generic Music Search App
GMSA or Generic Music Search App is just that, a music searching app that uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api) to search for Artists, Albums, and Tracks.

## Prerequisites
 * Chrome/Firefox/Safari/Edge >= Latest major versions or Developer versions
 * NodeJS >= 18.0.0
 * npm >= 9.0.0
 * MongoDB >= 5.5.0

## Getting Started
First, the project needs a proper `.env` file filled out. You can use the `.env.dist` as the base file and simply renaming it to `.env` but information is still needed to be filled.

 * `PORT` and `PORT_GUI` are already given (8001 and 8000 respectively) but are available here if the default ports are already in use. Easy switch. You might also need to adjust `REDIRECT_URI`
 * `MUSIC_ID`is the Spotify API ID
 * `MUSIC_SECRET` is the Spotify API secret key
 * `REDIRECT_URI` is the redirect that the login goes to after Spotify, `http://localhost:8000/` is an example
 * `API_URL` ...
 * `DATABASE_URL` is the mongodb url, e.g. `mongodb://127.0.0.1/library`

To install and start each part:

	cd server
	npm run watch

	cd ../client
	npm run start

## Links
When running starting the frontend and backend services, the following urls will be accessible:
 * http://localhost:8000 - Web GUI
 * http://localhost:8001/spotify/v1 - Backend API
 * http://localhost:8001/spotify/v1/status - Status of authentication, if true - has access, otherwise no access.
 * http://localhost:8001/spotify/v1/login - requests new auth from Spotify
 * http://localhost:8001/spotify/v1/search - Search the Spotify API