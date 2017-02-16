// require keys.js file
var keys = require("./key.js");

// require twitter node package
var Twitter = require('twitter');

// require twitter node package
var spotify = require('spotify');

// require twitter node package
//var imdb = require('imdb-api');

// require request node package
var request = require("request");

// require file system node package
var fs = require("fs");

// data array to log into the log.txt file
var logData = [];


/* Twitter */

function getTweets(command,userName)
{

 var keysArray = []; // to store all the api keys

 for(var i in keys.twitterKeys)
 {
    // pushing the twitter API keys into keysArray
    keysArray.push(keys.twitterKeys[i]);
 }

 // adding appropriate credentials in the client object

 var client = new Twitter({
  
  consumer_key: keysArray[0],
  consumer_secret: keysArray[1],
  access_token_key: keysArray[2],
  access_token_secret: keysArray[3]

  });

 // parameters for request API
 var params = { screen_name: userName };

 //pushing log data into array
 logData.push("\nCommand\n");

 logData.push(command+" "+userName);

 //GET request against API using the parameter 
 client.get('statuses/user_timeline',params, function(error, tweets) {
  
  // if error 
  if (error) {
    
    console.log(error);

  }
    // response tweets
    for(var i in tweets)
    {
      // Print tweets and the date when they were created to the console  
      console.log("\n**** Tweets ****\n");
      
      console.log(tweets[i].text);

      console.log("\n**** Created At ****\n");

      console.log(tweets[i].created_at);

      // push tweets and date into logData array

      logData.push("\n**** Tweets ****\n");

      logData.push(tweets[i].text);

      logData.push("\n**** Created At ****\n");

      logData.push(tweets[i].created_at)

    
    }

    // writing all the response data from logData to the file log.txt

    fs.appendFile("log.txt",logData,function(err,data){
    
    //if error
    if(err)
      {
        console.log(err);
      }

    console.log("data logged into log.txt");
  
    })

 });

}

/* Spotify */

function getSpotifySongs(command,songName)
{

  // pushing the command into logData

  logData.push("\nCommand\n"); 

  logData.push(command+" "+songName);

  // method for spotify song search with parameters type and songname

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    
    // if error
    if ( err ) {
        
        console.log(err);
    }

    // getting the details from the response data and printing it to the console.
    // and pushing the response data into logData array

    for(var i in data)
    {

      for(var j in data[i].items)
      {

        console.log("\n********* Album Name ********\n");

        console.log(data[i].items[j].album.name);  

        console.log("\n********* Name of the song ********\n");

        console.log(data[i].items[j].name);

        console.log("\n********* Preview Link ********\n");

        console.log(data[i].items[j].preview_url);

        logData.push("\n********* Album Name ********\n");
        
        logData.push(data[i].items[j].album.name);
        
        logData.push("\n********* Name of the song ********\n");
        
        logData.push(data[i].items[j].name);
        
        logData.push("\n********* Preview Link ********\n");
        
        logData.push(data[i].items[j].preview_url);

        for(var k in (data[i].items[j].artists))
        {
          
          console.log("\n********* Artists ********\n");

          console.log(data[i].items[j].artists[k].name);
          
          logData.push("\n********* Artists ********\n");

          logData.push(data[i].items[j].artists[k].name);

        }
     }
    
    }

   // writing all the response data from logData to the file log.txt

    fs.appendFile("log.txt",logData,function(err,data){
    
    if(err)
      {
        console.log(err);
      }

    console.log("data logged into log.txt");
  
    })

});

}

/* Netflix Roulette to get the movie details  */

function getMovieDb(command,movieName)
{

  // url for netflix roulette API
  var url = "https://netflixroulette.net/api/api.php?title="+movieName.trim();
  
  // pushing data into logData array
  logData.push("\nCommand\n");

  logData.push(command+" "+movieName);

  //request method to make http call
  request(url, (error, response, body) => {
      
      // if successfull
      if (!error && response.statusCode == 200) 
        {
        
          // get the details from the response object parse it to JSON
          // object and print it to console and push the data into logData array

          var info = JSON.parse(body);

          console.log("\n********* Movie Title ********\n");

          logData.push("\n********* Movie Title ********\n");

          console.log(info.show_title);

          logData.push(info.show_title);

          console.log("\n********* Year Released ********\n");

          logData.push("\n********* Year Released ********\n");

          console.log(info.release_year);

          logData.push(info.release_year);

          console.log("\n********* IMDB Rating ********\n");

          logData.push("\n********* IMDB Rating ********\n");

          console.log(info.rating);

          logData.push(info.rating);

          console.log("\n********* Movie Plot ********\n");

          logData.push("\n********* Movie Plot ********\n");

          console.log(info.summary);

          logData.push(info.summary);

          console.log("\n********* Movie Actors ********\n");

          logData.push("\n********* Movie Actors ********\n");

          console.log(info.show_cast);

          logData.push(info.show_cast);

          // writing all the response data from logData to the file log.txt

          fs.appendFile("log.txt",logData,function(err,data){
    
          if(err)
            {
              console.log(err);
            }

          console.log("data logged into log.txt");
  
    })

        }
        else
          {
            console.log(error);
          }
    
    });

  // was using imdb node api but to get the movie details but it was without request node package ,hence switched 
  // to netflix roulette to make use of request

   /* let movie;

    imdb.getReq({ name: movieName }, (err, things) => {
    
    movie = things;

    if(err)
    {
      console.log(err);

    }

    console.log("\n********* Movie Title ********\n");

    console.log(movie.title);

    console.log("\n********* Year Released ********\n");

    console.log(movie.year);

    console.log("\n********* IMDB Rating ********\n");

    console.log(movie.rating);

    console.log("\n********* Country ********\n");

    console.log(movie.country);

    console.log("\n********* Movie Language ********\n");

    console.log(movie.languages);

    console.log("\n********* Movie Plot ********\n");

    console.log(movie.plot);

    console.log("\n********* Movie Actors ********\n");

    console.log(movie.actors);

    console.log("\n********* IMDB url ********\n");

    console.log(movie.imdburl);


  });*/
}

/* Random text */

function getRandom()
{

  // read the data from random.txt
  fs.readFile("random.txt","utf8",function(err,data){
  
    // if error
    if(err)
      {
        console.log(err);
      }
  
  // get the data from the random.txt
  var list = data.split(",");

  // find the command 
  var randomCommand = list[0];

  // find the argument
  var argument = list[1];

  // call the respective function as per the command
  if(randomCommand === "spotify-this-song")
  {
    getSpotifySongs(randomCommand,argument);
  }

  });

}

// get the command from command line
var command = process.argv[2];

// get the argument from command line
var nodeArg = process.argv;

  // if the command is my-tweets call getTweets function
  if(command === "my-tweets")
      {

        var userName = "";

        for(var i = 3 ; i < nodeArg.length ; i++)
          {
            userName = userName+nodeArg[i];
          }
        
        if(userName)
          {
            getTweets(command,userName);
          }
            else
              {
                console.log("Enter a valid twitter name!!");
              }
      }
       // else if the command is spotify-this-song call getSpotifySongs function

        else if(command === "spotify-this-song")
          {
            var songName = "";

            var defaultSong = "The Sign";

            for(var i = 3 ; i < nodeArg.length ; i++)
              {
                songName = songName+" "+nodeArg[i];
              }

            if(songName)
              {
                getSpotifySongs(command,songName);
              }
              else
                {
                  getSpotifySongs(command,defaultSong);
                }

          }

          // else if the command is movie-this call getMovieDb function

          else if(command === "movie-this")
              {

                  var movieName = "";

                  var defaultMovie = "Mr. Nobody";

                  for(var i = 3 ; i < nodeArg.length ; i++)
                    {
                        movieName = movieName+" "+nodeArg[i];
                    }

                  if(movieName)
                      {
                        getMovieDb(command,movieName);
                      }
                      else
                      {
                        getMovieDb(command,defaultMovie);
                      }
              }

              // else if the command is do-what-it-says call getRandom function

              else if(command === "do-what-it-says")
                    {
                      getRandom(command);

                    }

              else
                {

                    console.log("Enter a valid command!!");
                }

  

