var keys = require('./keys'),
		fs = require('fs'),
		request = require("request");

// Varibles for keys.js module exports
var tweet = keys.twitterKey,
		params = keys.params,
		spotify = keys.spotify;

// Capture inputs
var input = process.argv[2],
		secondaryInput = process.argv[3];


// Command: node liri.js my-tweets
// Sends Twitter API request
function findTweets() {
	tweet.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for ( var i = 0; i < 20; i++) {
				console.log("Created on: ", tweets[i].created_at);
				console.log(params.screen_name + " tweeted: " + tweets[i].text);
				console.log(" ");
			}
		} else {
			console.log(error);
		}
	});
}

// Command: node liri.js spotify-this-song '<song name here>'
// Sends Spotify API request
function findSongs() {
	// If no song is provided then your program will default to "The Sign" by Ace of Base.
	// Checks if a argument was entered for the secondaryInput variable
	var query = (secondaryInput === undefined) ? "The+Sign" : secondaryInput;

	spotify.search({type: 'track', query: query}, function(err, data) {
	if (err) {
		return console.log('Error occurred: ' + err);
	}

 	var music = data.tracks.items[0];
 	console.log("Artist(s): ", music.album.artists[0].name);
  console.log("Song title: \"" + music.name + "\"");
  console.log("Album name: ", music.album.name);
	console.log("Preview link: ", music.preview_url);
	});
}

//OMDb API
// Command: node liri.js movie-this '<movie name here>'
// Sends OMDB API request
function findMovie() {
	// Checks if a argument was entered for the secondaryInput variable
	var url = (secondaryInput === undefined) ? ("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece") 
	: ("http://www.omdbapi.com/?t=" + secondaryInput + "&y=&plot=short&apikey=40e9cece");

	request(url, function(error, response, body) {
		var json = JSON.parse(body);

		console.log("Movie title: ", json.Title);
		console.log("Year released: ", json.Year);
		console.log("IMDb rating: ", json.Ratings[0].Value);
		console.log("Rotten Tomatoes rating: ", json.Ratings[1].Value);
		console.log("Country where the movie was produced: ", json.Country);
		console.log("Language: ", json.Language);
		console.log("Plot: ", json.Plot);
		console.log("Actors: ", json.Actors);
	});
}

//TEXT FILE
// Command: node liri.js do-what-it-says
// Reads the data from .txt file and runs the command
function findText(fn) {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) throw error;

		var dataArr = data.split(",");
		input = dataArr[0];
		secondaryInput = dataArr[1];

		// Invoked commands() and checks for a matching condition
		return fn();
	})
}

// Commands
(function commands () {
	switch (input) {
		case "my-tweets":
			findTweets();
			break;
		case "spotify-this-song":
			findSongs();
			break;
		case "movie-this":
			findMovie();
			break;
		case "do-what-it-says":
			findText(commands);
			break;
		default:
			console.log("Please enter a valid command.");
	}
})();