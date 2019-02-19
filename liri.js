require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require ("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");


var method = process.argv[2];
var search = process.argv[3];
// var search = process.argv.slice(3).join(" ");

if (method === "movie-this") {
  if (search === undefined) {
    search = "Mr Nobody";
    
  }

var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(
  function(response) {
    // console.log(response);
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  }
);
    
} else if (method === "concert-this") {

  var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(
    function(response) {
      // console.log(response);
      for (i = 0; i < 3; i++) {
      console.log("Venue: " + response.data[i].venue.name);
      console.log("Location: " + response.data[i].venue.city);
      console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n-------------------------------");
  }}
);
  
} else if (method === "spotify-this-song") {if (search === undefined) {
  search = "The Sign Ace of Base";
  
}
  spotify.search({ type: 'track', query: search })
  .then(function(response) {
    /* console.log(util.inspect(response, {showHidden: false, depth: null})); */
    console.log("Artists: " + response.tracks.items[0].artists[0].name);
    console.log("Song Name: " + response.tracks.items[0].name);
    console.log("Link to Spotify: " + response.tracks.items[0].preview_url);
    console.log("From the Album: " + response.tracks.items[0].album.name);
  
  });

 
} else if (method === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    // console.log(data);
    var dataArr = data.split(",");
    // console.log(dataArr);
    var search = dataArr[1];
    var method = dataArr[0];
    spotify.search({ type: 'track', query: search })
  .then(function(response) {
    /* console.log(util.inspect(response, {showHidden: false, depth: null})); */
    console.log("Artists: " + response.tracks.items[0].artists[0].name);
    console.log("Song Name: " + response.tracks.items[0].name);
    console.log("Link to Spotify: " + response.tracks.items[0].preview_url);
    console.log("From the Album: " + response.tracks.items[0].album.name);
  
  });
  
  });

} 
