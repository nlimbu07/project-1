// omdb Api key
var apiKey = 'fc1fef96';

// Created Variable to grab element with id=movie-info
var movieInfoEl = document.querySelector('#movie-info');
var qurybox = document.querySelector('#qurybox');
// array to store the movies
var movies = [];

// saves movies in local storage
if (localStorage.getItem('movie-title')) {
  movies = JSON.parse(localStorage.getItem('movie-title'));
}

// Declared a variable to store the movie
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
      var title = data.Title;
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
        'https://img.omdbapi.com/?i=' + posterid + '&h=600&apikey=fc1fef96';

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
            <p>Movie Name: <i style="color: orange;">${title}</i><br><br>
            Genre: <i style="color: orange;">${genreEl}</i><br><br>
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

// add movies data to the movies array as an object
var save = function () {
  var saveBtn = document.querySelector('.btn');
  if (saveBtn) {
    movies.push(qurybox.value);
    qurybox.value = '';
    localStorage.setItem('movie-title', JSON.stringify(movies));
    addToList();
  } else if (getMovieInfo(data) > 0) {
    movies.push(data.toUpperCase());
    localStorage.setItem('movie-title', JSON.stringify(movies));
    addToList();
  }
};

// click handlers
$('.btn').on('click', save);

// dynamically add the passed movies on the search history
function addToList() {
  var ulEl = document.querySelector('.save-list');
  ulEl.innerHTML = '';
  for (var i = 0; i < movies.length; i++) {
    var liEl = document.createElement('li');
    liEl.className = 'save-list-group';
    liEl.textContent = movies[i];
    ulEl.appendChild(liEl);
  }
}

// calling function
addToList();
