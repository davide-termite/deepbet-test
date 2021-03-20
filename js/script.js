function displayResult(match) {
  var source = $("#match-row").html();
  var template = Handlebars.compile(source);

  var html = template(match);
  $(".results").append(html);
}

$(document).ready(function () {
  $.ajax({
    url: "https://v3.football.api-sports.io/fixtures?league=135&season=2020",
    method: "GET",
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "a2bcab46bfe58538f588520d4bfd52c8",
    },

    success: function (data) {
      var response = data.response;

      var selectedMatch = [];

      for (let i = 0; i < response.length; i++) {
        var matchStatusShort = response[i].fixture.status.short;

        if (matchStatusShort === "NS" || matchStatusShort === "TBD") {
          selectedMatch.push(response[i]);
        }
      }

      for (let i = 0; i < selectedMatch.length; i++) {
        var match = {
          status: selectedMatch[i].fixture.status.long,
          date: selectedMatch[i].fixture.date,
          round: selectedMatch[i].league.round,
          home: selectedMatch[i].teams.home.name,
          away: selectedMatch[i].teams.away.name,
        };

        displayResult(match);
      }
    },

    error: function (errore) {
      alert("C'è stato un errore " + errore);
    },
  });
});
