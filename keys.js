var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// TWITTER
var twitterKey = new Twitter ({
  consumer_key: 't2wywCp4bWBOwfVZzLm79gjbf',
  consumer_secret: '5ucRPRu0Oi17wKWRNzOKYG163cgxOSgXIRqtonvi0dQiOY1B9C',
  access_token_key: '919199146589990912-jDJtbZz6I0dGsE4sX1X6r1mOpV0UscU',
  access_token_secret: 'tK0URis7frkW5xFnWqUwb8RBKcJi3XvoEJMLWwslAVChE',
});

var params = {
	screen_name:'rihanna',
	id: 20,
	count: 20
}

// SPOTIFY
	var spotify = new Spotify({
  id: '839aaaeac2704e399b8f5ea6bd416365',
  secret: 'be1bdc26af1a47d9ba97a59b8535643a'
});

module.exports = {
	twitterKey: twitterKey,
	params: params,
	spotify: spotify
}