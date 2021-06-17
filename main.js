let canvas, context;
let startPage, gamePage, scorePage;
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
    canvas = document.getElementById("gameCanvas");
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
}

function switchToScoreSreen(score){
    hideAllScreens()
    scorePage.classList.remove("hidden")
    document.getElementById("score").innerText = score;
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