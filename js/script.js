function displayResult(match) {
  var source = $("#match-row").html();
  var template = Handlebars.compile(source);

  var html = template(match);
  $(".result-rows").append(html);
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

      console.log(selectedMatch);

      for (let i = 0; i < selectedMatch.length; i++) {
        var time = selectedMatch[i].fixture.date;

        var date = time.substring(0, 10);
        var hour = time.substring(11, 19);

        var match = {
          id: selectedMatch[i].fixture.id,
          homeLogo: selectedMatch[i].teams.home.logo,
          awayLogo: selectedMatch[i].teams.away.logo,
          status: selectedMatch[i].fixture.status.long,
          date: date,
          hour: hour,
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
