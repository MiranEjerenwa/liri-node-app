require('dotenv').config();

//Initial Node Packages

const Spotify = require('node-spotify-api');
const fs = require('fs');
const request = require('request');
//Import API Keys froms key.js file

let keys = require("./keys.js");

let spotify = new Spotify(keys.spotify);

//Set arguments that will be used by the app to retrieve data from APIs

let input1 = process.argv[2];

let input2 = process.argv[3];

//This will search the Bands in Town Artist Events API (https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp) for 

// an artist and render the following information about each event to the terminal:

const getConcertInfo = function(input){

//Setup API Call

let queryUrl = (`https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`);

request(queryUrl, function (error, response, body) {

if (!error && response.statusCode === 200) {

var parsedBody = JSON.parse(body);

parsedBody.forEach(function (e) {

console.log('-------------------------------------------------------------------');

console.log("Artist: " + e.lineup[0]);

console.log("Venue: " + e.venue.name);

console.log("Venue Location: " + e.venue.city);

console.log("Event Date: " + e.datetime);

console.log('-------------------------------------------------------------------');

}, this);

}
else{
  console.log ("goooooofed");
}
});

}

// This will show the following information about the song in your terminal/bash window

const getSpotifySong = function(input){

if(!input){

input = "What's My Age Again"

}

spotify.search({type: 'track', query: input }, function (err, data) {

if (err) {

return console.log('Error occurred: ' + err);

}

console.log('-------------------------------------------------------------------');

console.log("Artist: " + data.tracks.items[0].artists[0].name);

console.log("Song Name: " + data.tracks.items[0].name);

console.log("Preview link: " + data.tracks.items[0].preview_url);

console.log("Album: " + data.tracks.items[0].album.name);

console.log('-------------------------------------------------------------------');

});

}

// This will show the following information about the movie in your terminal/bash window

const getMovieInfo = function(input){

if(!input){

input = "Mr.Nobody";

}

//Setup API Call

let queryUrl = (`http://www.omdbapi.com/?t=${input}&plot=short&apikey=trilogy`);

request(queryUrl, function (error, response, body) {

if (!error && response.statusCode === 200) {

// console.log(body);

var parsedBody = JSON.parse(body);

console.log('-------------------------------------------------------------------');

console.log("Title: " + parsedBody.Title);

console.log("Year: " + parsedBody.Year);

console.log("IMDB Rating: " + parsedBody.imdbRating);

console.log("Rotten Tomatoes Rating: " + parsedBody.Ratings[1].Value);

console.log("Country: " + parsedBody.Country);

console.log("Language: " + parsedBody.Language);

console.log("Plot: " + parsedBody.Plot);

console.log("Actors: " + parsedBody.Actors);

console.log('-------------------------------------------------------------------');

}

});

}

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

const doFromTxt = function(){

fs.readFile("./random.txt", "utf8", function (error, data) {

if (error) {

return console.log(error);

}

getSpotifySong(data);

});

}

//Initiate switch commands
const selector = function (input1, input2) {
switch (input1){

case 'concert-this':

getConcertInfo(input2);

break;

case 'spotify-this-song':

getSpotifySong(input2);

break;

case 'movie-this':

getMovieInfo(input2);

break;

case 'do-what-it-says':

doFromTxt();

break;

default: console.log('what is going on in here ????');

break;

}
};
const runThis = function (param1, param2) {
  selector(param1, param2);
}

runThis (process.argv[2], process.argv.slice(3).join(' '));
