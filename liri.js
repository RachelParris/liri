var fs = require('fs');
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// Capture inputs
var input = process.argv[2];
var secondaryInput = process.argv[3];


// TWITTER
var twitterKey = new Twitter ({
  consumer_key: 't2wywCp4bWBOwfVZzLm79gjbf',
  consumer_secret: '5ucRPRu0Oi17wKWRNzOKYG163cgxOSgXIRqtonvi0dQiOY1B9C',
  access_token_key: '919199146589990912-jDJtbZz6I0dGsE4sX1X6r1mOpV0UscU',
  access_token_secret: 'tK0URis7frkW5xFnWqUwb8RBKcJi3XvoEJMLWwslAVChE',
});

// Command: node liri.js my-tweets
// Sends Twitter API request
function findTweets() {
	var params = {
	screen_name:'rihanna',
	id: 20,
	count: 20
}

twitterKey.get('statuses/user_timeline', params, function(error, tweets, response) {
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


// SPOTIFY
	var spotify = new Spotify({
  id: '839aaaeac2704e399b8f5ea6bd416365',
  secret: 'be1bdc26af1a47d9ba97a59b8535643a'
});

// Command: node liri.js spotify-this-song '<song name here>'
// Sends Spotify API request
function findSongs() {
	if (secondaryInput === undefined) {
		// If no song is provided then your program will default to "The Sign" by Ace of Base.
		var query = "The+Sign";
	} else {
		var query = secondaryInput;
	}

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
	if (secondaryInput === undefined) {
		var url = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=40e9cece";
	} else {
		var url = "http://www.omdbapi.com/?t=" + secondaryInput + "&y=&plot=short&apikey=40e9cece";
	}
	
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
	if (input === "my-tweets") {
		findTweets();
	} else if (input === "spotify-this-song") {
		findSongs();
	} else if (input === "movie-this") {
		findMovie();
	} else if (input === "do-what-it-says") {
		findText(commands);
	} else {
		console.log("Please enter a valid command.");
	}
})();

