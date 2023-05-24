let colors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let i = 0
let started = false;
let gameLevel = 0
function genRandom() {
    return Math.floor(Math.random() * (4))
}

function playSound(name) {
    let a = new Audio('./sounds/' + name + ".mp3");
    a.play();
}

function fadeCool(name) {
    $('#' + name).fadeOut(200).fadeIn(200)
}

function animatePress(name) {
    let x = $("#" + name)
    x.addClass("pressed")
    setTimeout(() => {
        x.removeClass("pressed")
    }, 100)
}

function nextSequence() {
    let rcc = colors[genRandom()]
    playSound(rcc)
    fadeCool(rcc)
    gamePattern.push(rcc)
}

function updateHeading(gm) {
    $("h1").text("Current level: " + gameLevel)
}


function reset() {
    gameLevel = 0;
    gamePattern = []
    userPattern = []
    // i = 0
    started = false
    // location.reload()

}
$(".btn").click((event) => {

    let userChosenColor = event.target.id

    playSound(userChosenColor)
    animatePress(userChosenColor)
    userPattern.push(userChosenColor)

    if (gamePattern[userPattern.length - 1] === userPattern[userPattern.length - 1]) {
        console.log("true");
        if (userPattern.length >= gamePattern.length) {
            console.log("Success!")
            userPattern = []
            gameLevel += 1
            updateHeading(gameLevel)
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press any key to restart")
        reset()
        console.log("Fail")
    }
})

$(document).keypress(() => {
    if (!started) {
        nextSequence()
        updateHeading(gameLevel)
        started = true
    }

})


