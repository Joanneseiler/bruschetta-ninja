# Bruschetta Ninja
[Link Deploy](http://github.com)

## Description
As a chef, you need to master precise cutting techniques. You have to be careful not to cut your fingers. In Bruschetta Ninja we prepare some ingredients for bruschetta. But think about which ingredients you really need to cut. From time to time a chicken comes along, who just wants to have a little fun and jumps into the room to see how you're doing. It wants to stay in one piece just as much as your fingers.

## MVP
- tomatoes fly into the viewport from above in a random interval
- chickens fly into the viewport from above in a random interval
- if a tomato hits the ground, the game is over
- if a tomato is clicked by the player, the score goes up by 10 and the tomato disappears
- if a chicken is clicked by the player, the game is over

## Backlog
- add the ability to slice instead of just clicking chickens and tomatoes 
- the mouse leaves lines (cutting traces)
- after slicing, you can see two halves of the ingredient, which fall down
- the game spawns all bruschetta ingredients (add onions and bread)
- ingredients and chickens approach from the sides
- increasing difficulty: more ingredients at the same time and faster
- the score someone has reached is written on the scorepage (third page)
- splashes from the vegetables after cutting
- music, noise during cutting, game over noise
- if the game has become complex and difficult enough: add three lives and if an ingredient falls to the ground, you lose a life, but if you cut the chicken, you immediately lose the game

## Data structure
Classes and methods definition. Or functions.

## main.js
- window.addEventListener("load", () => {})
- initializePages()
- initializeCanvas()
- hideAllScreens()
- switchToSplashScreen()
- switchToGameScreen()
- switchToScoreSreen(score)
- initializeStartButton()

## game.js
- Game
- constructor(canvas, context, whenGameOver)
- start()
- spawnIngredient()
- updateGame()
- defineClickBehavior()
- endGame()
- spawnChicken()

## ingredient.js
- Indredient
- constructor(image, x, y, size)
- move()
- wasHit(x, y)

## slice.js
This still needs to be done:
- Slice {this.x, thix.y}
- addPoint()
- draw()
- move()
- checkCollision()

## chicken.js
- Chicken
- constructor(image, x, y)
- move()
- wasHit()

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