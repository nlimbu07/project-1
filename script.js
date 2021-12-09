var data;

function getanswer(q) {
    $.get("http://www.omdbapi.com/?s=" + q + "apikey=5e6b3c6c", function () {
        var rawstring = JSON.stringify(rawdata);
        data = JSON.parse(rawstring)
        var title = data.Search[0].title;
        var year = data.Search[0].Year;
        var imbdurl = "https://www.imdb.com/title/" + data.Search[0].imbdID + "/";

        document.getElementById('answer').innerHTML = "<h1>" + title + "</h1><p>Year Released: " + year + "</p><br><p>IMDb page: <a href=" + imbdurl + "target='_blank'>" + imbdul + "</a></p>";
    })
}