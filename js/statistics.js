$(document).ready(function () {
  var matchId = sessionStorage.getItem("id");
  var homeId = sessionStorage.getItem("home");
  var awayId = sessionStorage.getItem("away");

  $.ajax({
    url:
      "https://v3.football.api-sports.io/teams/statistics?season=2020&team=" +
      homeId +
      "&league=135",
    method: "GET",
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "a2bcab46bfe58538f588520d4bfd52c8",
    },

    success: function (data) {
      var response = data.response;
      var homeName = response.team.name;

      console.log(response);
      console.log(homeName);

      $(".home").text(homeName);
    },

    error: function (errore) {
      alert("C'è stato un errore " + errore);
    },
  });
});
