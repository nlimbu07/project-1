// omdb Api key
var apiKey = '5e6b3c6c';

// Created Variable to grab element with id=movie-info
var movieInfoEl = document.querySelector('#movie-info');

//Declared a variable to store the movie
var data;

function getMovieInfo(info) {
  //This url is used to get the data from the server side and then we declare
  // variables and set them to the data we want from the server.
  $.get(
    `https://www.omdbapi.com/?t=${info}&apikey=${apiKey}`,
    function (rawdata) {
      var rawString = JSON.stringify(rawdata);
      data = JSON.parse(rawString);
      console.log(data.imdbID);
      var genreEl = data.Genre;
      var actors = data.Actors;
      var rated = data.Rated;
      var yearReleased = data.Released;
      var runtime = data.Runtime;
      var language = data.Language;
      var directorEl = data.Director;
      var writer = data.Writer;
      var country = data.Country;
      var imdbRating = data.imdbRating;
      var posterid = data.imdbID;
      var imdbUrl = 'https://www.imdb.com/title/' + data.imdbID + '/';

      // This is our second Api to retrieve our movie poster img
      var posterApi =
        'http://img.omdbapi.com/?i=' + posterid + '&h=600&apikey=5e6b3c6c';

      // console logging to test Poster Api response
      // because not all movies have a poster available
      console.log('posterApi', posterApi);

      // This function prevents a movie without a poster
      // from displaying onto the webpage
      $.get(posterApi, function () {
        // sets all of the retrieved data into dynamically created elements within the
        // movieInfoEl
        movieInfoEl.innerHTML = `
            <img class="image" src= '${posterApi}'><br><br>
            <p>Genre: <i style="color: orange;">${genreEl}</i><br><br>
            Rated: <i style="color: orange;">${rated}</i><br><br>            
            Released: <i style="color: orange;">${yearReleased}</i><br><br>
            Runtime: <i style="color: orange;">${runtime}</i><br><br>
            Language: <i style="color: orange;">${language}</i><br><br>
            Country: <i style="color: orange;">${country}</i><br><br>          
            Director: <i style="color: orange;">${directorEl}</i><br><br>
            Writer: <i style="color: orange;">${writer}</i><br><br>
            Actors: <i style="color: orange;">${actors}</i><br><br>
            IMDb Rating: <i style="color: orange;">${imdbRating}</i><br><br>            
            IMDB page: <a class='anchor' href='${imdbUrl}'target=''>${imdbUrl}</a></p><br>
            `;
      });
    }
  );
}
