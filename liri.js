const command = process.argv[2];
const Spotify = require('node-spotify-api');
 
const spotify = new Spotify({
  id: "5d8322379fbf4cbcb5a47f2cd7595100",
  secret: "cc140b15025f4d4ab10ed91e1ccc9b3b"
});
 

console.log(command);

if( command == "spotify-this"){
  const song = process.argv.splice(3, process.argv.length).join(" ");
  // shane said splice const stuff = process.argv.slice(2).join(' ');
  console.log(song, "this is the sone name");

  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.tracks.items[0]); 
  console.log('Song Name : ' + data.tracks.items[0].name )
  console.log('Preview URL : ' + data.tracks.items[0].preview_url)
  });
  
    
} else if ( command == "band-this"){
    console.log("We are in bands")
}

