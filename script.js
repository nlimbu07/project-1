// omdb Api key
var apiKey = '5e6b3c6c';

// Created Variable to grab element with id=movie-info
var movieInfoEl = document.querySelector('#movie-info');

//Declared a variable to store the movie 
var data;


function getMovieInfo(info) {
    //This url is used to get the data from the server side and then we declare 
    // variables and set them to the data we want from the server.
    $.get(`https://www.omdbapi.com/?t=${info}&apikey=${apiKey}`, function (rawdata) {
        var rawString = JSON.stringify(rawdata);
        data = JSON.parse(rawString);
        console.log(data.imdbID);
        var titleEl = data.Title;
        var genreEl = data.Genre;
        var actors = data.Actors;
        var imdRating = data.Rated;
        var yearReleased = data.Year;
        var directorEl = data.Director;
        var posterid = data.imdbID
        var imdbUrl = 'https://www.imdb.com/title/' + data.imdbID + '/';

        // This is our second Api to retrieve our movie poster img
        var posterApi = 'http://img.omdbapi.com/?i=' + posterid + '&h=600&apikey=5e6b3c6c';

        // console logging to test Poster Api response
        // because not all movies have a poster available
        console.log('posterApi', posterApi)

        // This function prevents a movie without a poster 
        // from displaying onto the webpage
        $.get(posterApi, function () {
            // sets all of the retrieved data into dynamically created elements within the 
            // movieInfoEl
            movieInfoEl.innerHTML = `
            <h1>Movie Title: ${titleEl}</h1><br>
            <img src= '${posterApi}'><br>
            <p>Genre: ${genreEl}</p><br>
            <p>Actors: ${actors}</p><br>
            <p> Year Released:${yearReleased}</p> <br>
            <p>Director: ${directorEl}</p><br>
            <p> IMDb Rating: ${imdRating}</p><br>
              <p> IMDB page: <a class='anchor' href='${imdbUrl}'target='_blank'>${imdbUrl}</a></p>
              `;
        });


    });
}



