# Bruschetta Ninja
[Link Deploy](http://github.com)

## Description
As a chef, you need to master precise cutting techniques. You have to be careful not to cut your fingers. In Bruschetta Ninja we prepare some ingredients for bruschetta. But think about which ingredients you really need to cut. From time to time a chicken comes along, who just wants to have a little fun and jumps into the room to see how you're doing. It wants to stay in one piece just as much as your fingers.

## MVP
- tomatoes fly into the viewport from above in a random interval
- chickens fly into the viewport from above in a random interval
- if a tomato hits the ground --> Game over
- if a tomato is clicked by the player, the score goes up by 10
- if a chicken is tapped by the player, the game is over

## Backlog
- add the ability to slice instead of just clicking chickens and tomatoes
- the game spawns all bruschetta ingredients (add onions and bread)
- ingredients and chickens approach from the sides

## Data structure
Classes and methods definition. Or functions.

## main.js
buildSplashScreen () {}
buildGameScreen () {}
buildGameOverScreen () {}

## game.js
Game()
start()
spawnIngredient()
spawnChicken()
checkCollision(x, y)
initCanvas()
drawCanvas()
updateCanvas()
clearCanvas()
gameOver()

## ingredient.js
Indredient() {this.x, this,y}
draw()
move()
hit()

## slice.js
Slice() {this.x, thix.y}
addPoint()
draw()
move()
checkCollision()

## chicken.js
Chicken() {this.x, this,y}
draw()
move()
hit()

## States and state transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- scoreScreen

## Task
- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildScoreScreen
- game - start
- game - initCanvas
- game - updateCanvas
- game - drawCanvas
- ingredient - draw
- ingredient - move
- ingredient - hit
- game - spawnIngredient
- chicken - draw
- chicken - move
- chicken - hit
- game - spawnChicken
- game - gameOver
- slice - addPoint
- slice - draw
- slice - move
- slice - checkCollision

## Additional Links


### Trello
[Link url](https://trello.com)


### Slides
[Link Slides.com](http://slides.com)