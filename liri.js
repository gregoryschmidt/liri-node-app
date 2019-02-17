require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require ("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");
// var util = require('util');

var method = process.argv[2];
var search = process.argv[3];
// var search = process.argv.slice(3).join(" ");

if (method === "movie-this") {

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
      console.log("Venue: " + response.data[0].venue.name);
      console.log("Location: " + response.data[0].venue.city);
      console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
  }
);
  
} else if (method === "spotify-this-song") {
  spotify.search({ type: 'track', query: search })
  .then(function(response) {
    /* console.log(util.inspect(response, {showHidden: false, depth: null})); */
    console.log("Artists: " + response.tracks.items[0].artists[0].name);
    console.log("Song Name: " + response.tracks.items[0].name);
    console.log("Link to Spotify: " + response.tracks.items[0].preview_url);
    console.log("From the Album " + response.tracks.items[0].album.name)
  
  });

 
} else if (method === "do-what-it-says") {

} else if (method === "movie-this" & search === "") {

  var queryUrl = "http://www.omdbapi.com/?t=" + "Mr Nobody" + "&y=&plot=short&apikey=trilogy";
  
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


     

