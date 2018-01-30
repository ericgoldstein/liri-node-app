var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
 
 var getMyTweets = function() {
var client = new Twitter(keys.twitterKeys);
console.log(keys.twitterKeys);
 
var params = {screen_name: 'NotTheRealMe5'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  
    // 
    for(var index=0; index < tweets.length; index++) {
    	console.log(tweets[index].created_at);
    	console.log(' ');
    	console.log(tweets[index].text);
    }

  }
  else {
    	console.log(error);
    }
});

}


 // need this//
var spotify = new Spotify({
  id: '944a88ac62cd4876b7df1b7f1252e600',
  secret: '7ee0e216cf574e2aa47e9f239a33c835'
});

var getArtistName = function(artist) {
	return artist.name;
}

var getMeSpotify = function(songName) {

 
spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
			var songs = data.tracks.items;
			for(var index=0; index <songs.length; index++) {
				console.log(index);
				console.log('artist(s): ' + songs[index].artists.map(
					getArtistName));
				console.log('song name: ' + songs[index].name);
				console.log('preview songs: ' +songs[index].preview_url);
				console.log('album: ' +songs[index].album.name);
				console.log('-------------------------------------');
			} 
});
}

var getMeMovie = function(movieName) {



request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	var jsonData = JSON.parse(body);

  	console.log('Title: ' + jsonData.Title);
  	console.log('Year: ' + jsonData.Year);
  	console.log('Rated: ' + jsonData.Rated);
  	console.log('IMDB Rating: ' + jsonData.imbdRating);
  	console.log('Country: ' + jsonData.Country);
  	console.log('Language: ' + jsonData.Language);
  	console.log('Plot: ' + jsonData.Plot);
  	console.log('Actors: ' + jsonData.Actors);
  	console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
  	console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
  }
});
}

var doWhatItSays = function() {

fs.readFile('random.txt', 'utf8', function(err, data) {
	if (err) throw err;
	
	var dataArr = data.split(',');
	if (dataArr.length == 2) {
		pick(dataArr[0], dataArr[1]);
	}
	else if (dataArr.length ==1) {
		pick(dataArr[0]);
	}
});
}

var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
		getMyTweets();
		break;
		case 'spotify-this-song':
			getMeSpotify(functionData);
		break;
		case 'movie-this':
			getMeMovie(functionData);
		break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:
		console.log('Liri does not know');
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);