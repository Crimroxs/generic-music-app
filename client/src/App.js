import "./App.css";

import React from "react";
import { useState, useEffect } from "react";

import { accessToken, logout, searchArtist } from "./services/spotify";
import { PiSpotifyLogoFill, PiHouseFill, PiSignOutFill, PiSignInFill, PiMagnifyingGlassBold } from "react-icons/pi";

import Searchbar from "./components/Searchbar";
import Card from "./components/Card";

function App() {
	const [token, setToken] = useState(null);
	const [albums, setAlbums] = useState([]);
	const [songs, setsongs] = useState([]);
	const [artists, setartists] = useState([]);
	const [hasSearched, sethasSearched] = useState(false);

	useEffect(() => {
		setToken(accessToken);
	}, []);

	const handleSearch = async (event) => {
		event.preventDefault();
		if(!accessToken) {
			window.location = window.location.origin;
		}
		const response = await searchArtist(event.target.search.value);
		setAlbums(response.albums);
		setsongs(response.songs);
		setartists(response.artists);
		sethasSearched(true);
	};

	return (
		<main className="wrapper">
			<nav className="header">
				<span className="logo">
					<PiSpotifyLogoFill />
				</span>
				<span className="search">
					<span className="searchIcon"><PiMagnifyingGlassBold /></span> <Searchbar onSubmit={handleSearch} />
				</span>
				<span className="navIcons">
					<a href="/">
						<PiHouseFill />
					</a>
					{!token ? (
						<>
							<a href="/login">
								<PiSignInFill />
							</a>
						</>
					) : (
						<>
							<a href="/logout" onClick={logout}>
								<PiSignOutFill />
							</a>
						</>
					)}
				</span>
			</nav>
			<section>
				<>
					{!token ? (
						<a href="http://localhost:8001/spotify/v1/login">To start, login to Spotify.</a>
					) : (
						<>
							<div className="no-results">
								<p>Use the search bar at the top to begin searching for songs, albums, and artists. Press enter to start the search.</p>
							</div>
							<div>
								{hasSearched ? (<><h3>Songs</h3></>) : (<></>)}
								{songs.length > 0 && (
									<div className="cards">
										{songs.map((song) => (
											<Card
												key={song.id}
												img={song.album.images[0].url}
												link={song.href}
												name={song.name}
												artist={song.artists[0].name}
											/>
										))}
									</div>
								)}
								{hasSearched ? (<><h3>Albums</h3></>) : (<></>)}
								{albums.length > 0 && (
									<div className="cards">
										{albums.map((album) => (
											<Card
												key={album.id}
												img={album.images[0].url}
												link={album.href}
												name={album.name}
												metadata={album.release_date}
												artist={album.artists[0].name}
											/>
										))}
									</div>
								)}
								{hasSearched ? (<><h3>Artists</h3></>) : (<></>)}
								{artists.length > 0 && (
									<div className="cards">
										{artists.map((artist) => (
											<Card
												key={artist.id}
												img={artist.images[0].url}
												link={artist.href}
												name={artist.name}
												metadata={artist.genres[0]}
											/>
										))}
									</div>
								)}
							</div>
						</>
					)}
				</>
			</section>
		</main>
	);
}

export default App;
