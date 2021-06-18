# Bruschetta Ninja
[Link Deploy](https://joanneseiler.github.io/bruschetta-ninja/)

## Description
As a chef, you need to master precise cutting techniques. You have to be careful not to cut your fingers. In Bruschetta Ninja we prepare some ingredients for bruschetta. But think about which ingredients you really need to cut. From time to time a chicken comes along, who just wants to have a little fun and jumps into the room to see how you're doing. It wants to stay in one piece just as much as your fingers.

## MVP
- tomatoes fly into the viewport from above in a random interval
- chickens fly into the viewport from above in a random interval
- if a tomato hits the ground, the game is over
- if a tomato is clicked by the player, the score goes up by 10 and the tomato disappears
- if a chicken is clicked by the player, the game is over

## Backlog
done:
- add the ability to slice instead of just clicking chickens and tomatoes 
- the mouse leaves lines (cutting traces)
- the game spawns all bruschetta ingredients (add onions and bread)
- ingredients fly into the viewport from the bottom and fall back down
- the score someone has reached is written on the scorepage (third page)
- add game music, score page music, cutting sound effect

could still be done:
- after slicing, you can see two halves of the ingredient, which fall down
- splashes from the vegetables after cutting
- if the game has become complex and difficult enough: add three lives and if an ingredient falls to the ground, you lose a life, but if you cut the chicken, you immediately lose the game
- increasing difficulty: more ingredients at the same time and faster

## Data structure

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
- defineMouseMoveBehavior()
- endGame()
- spawnChicken()

## ingredient.js
- Indredient
- constructor(image, x, y, size)
- move()
- wasHit(x, y)

## chicken.js
- Chicken
- constructor(image, x, y)
- move()
- wasHit()

## States and state transitions

- splashScreen
- gameScreen
- scoreScreen

## Tasks
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

### Slides
[Link Slides.com](https://docs.google.com/presentation/d/1lgzXPNpu6NI_sc5YJA0Xa2z_EoPnj-5TGUBP8krlM7M/edit?usp=sharing)