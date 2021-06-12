let canvas;
let ctx;


function initializeCanvas() {
    canvas = document.getElementById("myCanvas");
    // oder canvas = document.querySelector("canvas")
    ctx = canvas.getContext("2d"); 
    canvas.style.backgroundColor = "#FBF6C4"  
}




//function switchToGameScreen
// let game = new Game
//game.start


initializeCanvas()