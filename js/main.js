let canvas, context;
let startPage, gamePage, scorePage, scoreMessage;
let scoreAudio = new Audio("sounds/8-bit-rpg-music-the-heroines-theme-original-composition.mp3")
scoreAudio.volume = 0.1

window.addEventListener("load", () => {
    initializePages()
    initializeCanvas()
    initializeStartButton("start-button")
    initializeStartButton("restart-button")
    switchToSplashScreen()
})

function initializePages() {
    startPage = document.getElementById("start-page");
    gamePage = document.getElementById("game-page");
    scorePage = document.getElementById("score-page")
}

function initializeCanvas() {
    canvas = document.getElementById("game-canvas");
    let screenWidth = document.body.getBoundingClientRect().width;
    let maxWidth = canvas.getAttribute('width');
    canvas.setAttribute('width', Math.min(screenWidth, maxWidth)); // Math.min() returns the lowest-valued number passed into it
    context = canvas.getContext("2d");
}

function hideAllScreens(){
    startPage.classList.add("hidden")
    gamePage.classList.add("hidden")
    scorePage.classList.add("hidden")
}

function switchToSplashScreen() {
    hideAllScreens()
    startPage.classList.remove("hidden")
}

function switchToGameScreen(){
    hideAllScreens()
    gamePage.classList.remove("hidden")
    let screenHeight = window.innerHeight;
    //canvas.setAttribute('height', Math.max(screenHeight, canvas.getAttribute('height')));
    canvas.setAttribute('height', screenHeight)
}

function switchToScoreSreen(score){
    hideAllScreens()
    scorePage.classList.remove("hidden")
    document.getElementById("score").innerText = score;

    if (score < 100) {
        scoreMessage = "Wow, you really suck at cooking, please never cook for me!"
    }
    else if (score < 300) {
        scoreMessage = "Not bad, but I prefer to cook myself, I think you still need practice."
    }
    else {
        scoreMessage = "Yummyyy, I bet that wasn't the first time you cooked!"
    }

    document.getElementById("score-message").innerText = scoreMessage;
    scoreAudio.play()
}

function initializeStartButton(buttonId){
    let button = document.getElementById(buttonId)
    button.addEventListener("click", () => {
        switchToGameScreen()
        let game = new Game(canvas, context, switchToScoreSreen);
        game.start()
        scoreAudio.pause()
    })
}