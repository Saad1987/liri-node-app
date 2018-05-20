require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require("request");

var log;

var client = new Twitter(keys.twitter);

var spotify = new Spotify(keys.spotify);

function logIT(log) {

	var divider = "\n------------------------------------------------------------\n\n";
	fs.appendFile("log.txt", log+divider, function(err) {
		if (err) throw err;
	});
}

var liri = function() {

    this.tweet = function() {
    var params = {screen_name: 'nodejs' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        
        console.log("My 20 Most Recent Tweets !! :");
       
    
        for(var i = 0; i < tweets.length; i++) {
            
          var twt = [];
             
          twt[i] = "\n------------------------------------------------------------\n( #Tweet N#" + (i + 1) + " ), Created:  " + tweets[i].created_at+"\nTweet : " + tweets[i].text;
          t= twt.join("");
          console.log(t);
          logIT(t);
        }
        
    }
    
    });
    
    }

    this.spotify = function(song) {

       
     //Retrieving data from Spotify API :
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       function artists() {
       
          if(data.tracks.items[0].artists.length === 0) {
             return data.tracks.items[0].artists[i].name ;
          } else {
            for(var i = 0; i < data.tracks.items[0].artists.length; i++) {
            
            var arr = []
            arr[i] = data.tracks.items[0].artists[i].name;
            return arr.join("|");
          }
        }
      }
        var showData = [
        "Artist(s):    " + artists(),
        "Song:         " + data.tracks.items[0].name,
        "Preview Link: " + data.tracks.items[0].preview_url,
        "Album:        " + data.tracks.items[0].album.name
        ].join("\n");

        console.log(showData);
        logIT(showData);
    
      });

    
    }
    
      this.movieFinder = function(movie) {
     

	//we use "request" to access to OMD API website and pull the data from there
	request("http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "&y=&plot=short&r=json", function(error, response, body) {
	  if (!error && response.statusCode === 200) {
          var data = JSON.parse(body);
          var showData =[
	    "Title of the movie:         " + data.Title,
	    "Year the movie came out:    " + data.Year,
	    "IMDB Rating of the movie:   " + data.imdbRating,
	    "Country produced:           " + data.Country,
	    "Language of the movie:      " + data.Language,
	    "Plot of the movie:          " + data.Plot,
      "Actors in the movie:        " + data.Actors,
      "Rotten Tomatoes Rating :    "+ tomatoes()
    ].join("\n");

    console.log(showData);
  logIT(showData);
	    // For loop parses through Ratings object to see if there is a Roten Tomatoes rating and if there is, it will pull it
      function tomatoes() {
      for(var i = 0; i < data.Ratings.length; i++) {
	    	if(data.Ratings[i].Source === "Rotten Tomatoes") {

          return data.Ratings[i].Value ;
	    
        } else { return "No Tomatoes Rating !"}
      }
	    }
      }
     
      
	});

    }

   
    

}

module.exports = liri;
    