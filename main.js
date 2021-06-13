let canvas, context;
let startPage, gamePage, scorePage; 

window.addEventListener("load", () => {
    initializePages()
    initializeCanvas()
    initializeStartButton()
    //initializeStartButton(startButton)
    //initializeStartButton(restartButton)
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
    canvas.style.backgroundColor = "#FBF6C4"  
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
}

function initializeStartButton(){
    let startButton = document.getElementById("start-button")
    startButton.addEventListener("click", () => {
        switchToGameScreen()
        let game = new Game(canvas, context, switchToScoreSreen);
        game.start()
    })
}


