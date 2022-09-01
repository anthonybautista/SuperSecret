
function getLeaderboard() {
    $("#leaderboard").empty();
    $("#leaderboard").append(
        `<tr><th>Rank</th><th style="width: 60%">Owner</th><th>Points</th></tr>`
    );
    $.ajax({
        url: `https://supersecret.anthonybautist2.repl.co/api`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {},
        success: function (result) {
            let owners = Object.entries(result).sort(([,a],[,b]) => b-a)
            for (let i = 0; i < owners.length; i++) {
                $("#leaderboard").append(
                    `<tr><td>${i+1}</td><td>${owners[i][0]}</td><td>${owners[i][1]}</td></tr>`
                )
            }
        },
        error: function () {
            console.log("Error loading leaderboard.");
        }
    });
}

$(function () {
    getLeaderboard();
    $("i").on('click', function () {
        getLeaderboard();
    });
})