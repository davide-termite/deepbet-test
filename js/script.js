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

      for (let i = 0; i < selectedMatch.length; i++) {
        var time = selectedMatch[i].fixture.date;

        var date = time.substring(0, 10);
        var hour = time.substring(11, 19);

        var match = {
          matchId: selectedMatch[i].fixture.id,
          homeId: selectedMatch[i].teams.home.id,
          awayId: selectedMatch[i].teams.away.id,
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

$(document).on("click", ".row", function () {
  var matchId = $(this).attr("matchId");
  sessionStorage.setItem("id", matchId);

  var homeId = $(this).children(".home-team").attr("teamId");
  sessionStorage.setItem("home", homeId);

  var awayId = $(this).children(".away-team").attr("teamId");
  sessionStorage.setItem("away", awayId);

  window.open("/statistics.html");
});
