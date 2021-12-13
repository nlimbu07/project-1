// console.log("hello world");

// var apiKey = '5e6b3c6c';

// var onKeyUp = document.getElementById('qurybox').value;
var answerEl = document.getElementById('answer');

var data;

function getanswer(q) {
  $.get(
    'https://www.omdbapi.com/?s=' + q + '&apikey=5e6b3c6c',
    function (rawdata) {
      var rawString = JSON.stringify(rawdata);
      data = JSON.parse(rawString);
      var titleEl = data.Search[0].Title;
      var genreEl = data.Search[0].Genre;
      var imdRating = data.Search[0].Rated;
      var yearReleased = data.Search[0].Year;
      var directorEl = data.Search[0].Director;
      var imdbUrl = 'https://www.imdb.com/title/' + data.Search[0].imdbID + '/';

      var posterUrl = data.Search[0].Poster;

      answerEl.innerHTML = `
      <h1>${titleEl}</h1><br>
      <img src= '${posterUrl}'><br>
      <p>Genre: ${genreEl}</p><br>
      <p> Year Released:${yearReleased}</p> <br>
      <p>Director: ${directorEl}</p><br>
      <p> IMDb Rating: ${imdRating}</p><br>
        <p> IMDB page: <a href='${imdbUrl}'target='_blank'>${imdbUrl}</a></p>
        `;
    }
  );
}

$('#search').on('click', getanswer);
