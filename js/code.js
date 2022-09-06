const FIRE = '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"username","type":"string"}],"name":"activate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"username","type":"string"}],"name":"addressFor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string","name":"username","type":"string"}],"name":"deactivate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"nftNameService","type":"address"},{"internalType":"bool","name":"allowed_","type":"bool"}],"name":"setAllowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"usernameFor","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]';
const FIRE_ADDRESS = "0x5adCD28C08Fdc5a913982391cebD866b27C717D4";
const RPC = 'https://api.avax.network/ext/bc/C/rpc';

const checkFire = async (address) => {
    const t = new ethers.providers.JsonRpcProvider(RPC);
    let fireContract = new ethers.Contract(FIRE_ADDRESS, FIRE, t);

    let fire = await fireContract.usernameFor(address);

    $("#leaderboard tr").each(function() {
        let tdElement = $(this).children()[1];
        if ($(tdElement).text() === address) {
            if (fire !== "") {
                $(tdElement).text(fire);
            }
        }
    });
}

const updateFire = async () => {
    $("#leaderboard tr").each(function() {
        let tdElement = $(this).children()[1];
        checkFire($(tdElement).text());
    });
}

function getLeaderboard() {
    $("#leaderboard").empty();
    $("#leaderboard").append(
        `<tr><th>Rank</th><th style="width: 60%">Owner</th><th>Points</th></tr>`
    );
    $.ajax({
        url: `https://zombieleaderboard.m5k.repl.co/api`,
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
    $("#refresh-icon").on('click', function () {
        getLeaderboard();
    });
    $("#fire-icon").on('click', function () {
        updateFire();
    });
})