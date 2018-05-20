var LIRI = require("./lirifunction.js")

	var fs = require("fs");

	// Load twitter npm module
// var Twitter = require('twitter');

	// Load spotify npm module
var liri = new LIRI() ;

function logIT(com,quer) {

    var Data = [
			"Command   :" + com,
			"Query     :" + quer+"\n",
			"Data:\n\n"
		].join("\n");
		fs.appendFile("log.txt",Data, function(err) {
		if (err) throw err;
	});
}

// var Spotify = require('node-spotify-api');

	// Load request npm module
// var request = require("request");
  
//load our private keys from keys.js
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

// put our command and queries into variables
var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

if (!command){

		console.log("\nPlease enter a command to run LIRI. \nExample of commands : my-tweets, spotify-this-song your-song-title, movie-this your-movie-title, do-what-it-says");

	
}

else if (command === "my-tweets") {

	logIT(command,"No query needed");
	liri.tweet();
	
} else if (command === "spotify-this-song") {

	if (!query) {
		query = "the sign ace of base";
	}
	logIT(command,query);
	liri.spotify(query);
	

} else if (command === "movie-this") {

	if (!query) {
		query = "mr nobody";
	}
	logIT(command,query);
	liri.movieFinder(query);

} else if(command === "do-what-it-says") {




	doIt();



} else {

	console.log("\nCommand not recognized!")
	console.log("Please enter a valid command to run LIRI. \nExample of commands : my-tweets, spotify-this-song your-song-title, movie-this your-movie-title, do-what-it-says");

	
}

function doIt() {
fs.readFile("random.txt", "utf-8", function(error, data) {
	
	var dataArr = data.split(",");

var y=	Math.round(Math.random() * dataArr.length);
	var command = dataArr[y];
	var query = dataArr[y+1];

	if (command === "spotify-this-song") {
		
		logIT(command,query);
		liri.spotify(query);
	
	} else if(command === "my-tweets") {

		liri.tweet();
	} else  if (command === "movie-this") {

		liri.movieFinder(query);
	} else {

		doIt();
	}
});
}