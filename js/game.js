class Game {
    constructor(canvas, context, whenGameOver){
        this.score = 0;
        this.ingredients = [];
        this.chickens = [];
        this.gameOver = false;
        this.canvas = canvas;
        this.context = context;
        this.intervalIds = [];
        this.updateGameIntervalId = null;
        this.whenGameOver = whenGameOver;
        this.slicePoints = [];
        this.gameAudio = new Audio("sounds/FASTER2019-01-02_-_8_Bit_Menu_-_David_Renda_-_FesliyanStudios.com.mp3");
        this.gameAudio.volume = 0.2;
        this.sliceAudio = new Audio("sounds/cartoon_whip_swipe_chop.mp3");
        this.sliceAudio.volume = 0.3;
    }
        
    start(){
        this.gameAudio.play()

        this.intervalIds.push(setInterval(() => {
            this.spawnIngredient()
        }, 2000))

        this.intervalIds.push(setInterval(() => {
            this.spawnChicken()
        }, 2000))

        this.intervalIds.push(setInterval(() => {
            this.slicePoints.shift()
        }, 50))

        this.defineMouseMoveBehavior()
        this.updateGame()
    }
    spawnIngredient(){
        let randomAmount = Math.round((Math.random() * 3) + 1)
        for (let i = 0; i < randomAmount; i++) {
            this.ingredients.push(this.getRandomIngredient())
        }
    }
    getRandomIngredient() {
        let possibleIngredients = [
            {image: "./images/tomato.png", size: 64},
            {image: "./images/onion.png", size: 64},
            {image: "./images/bread.png", size: 80},
        ]

        let randomIndex = Math.floor(Math.random() * possibleIngredients.length)
        let ingredient = possibleIngredients[randomIndex]

        let image = new Image()
        image.src = ingredient.image
        image.width = ingredient.size
        image.height = ingredient.size

        let xCenter = (canvas.width / 2) - (image.width / 2)
        let xShift = (Math.random() * 300) - 150
        let y = canvas.height + image.height
        let speedX = (Math.random() * 4) - 2
        let speedY = -((Math.random() * 4) + 12)

        return new Ingredient(
            image,
            xCenter + xShift,
            y,
            ingredient.size, 
            speedX,
            speedY
        )
    }
    spawnChicken(){
        let chickenImage = new Image();
        chickenImage.src = "./images/chicken.png"
        
        let chicken = new Chicken(
            chickenImage,
            Math.random() * (canvas.width - chickenImage.naturalWidth),
            -chickenImage.height,
            chickenImage.width, (Math.random() * 2) + 2
        );

        this.chickens.push(chicken)
    }
    updateGame(){
        context.clearRect(0, 0, canvas.width, canvas.height)

        this.updateChickens()
        this.updateIngredients()
        this.updateScore()
        this.drawSlice()

        if (this.gameOver === true) {
            this.endGame()
            return;
        }

        this.updateGameIntervalId = requestAnimationFrame(() => this.updateGame())
    }
    updateChickens() {
        this.chickens.forEach((chicken) => {
            context.drawImage(chicken.image, chicken.x, chicken.y)
            chicken.move()
        })
    }
    updateIngredients() {
        this.ingredients.forEach((ingredient) => {
            context.drawImage(ingredient.image, ingredient.x, ingredient.y, ingredient.size, ingredient.size)
            ingredient.move()
            ingredient.increaseSpeedY(0.2)
            if (ingredient.y > this.canvas.height + ingredient.size) {
                this.gameOver = true;
            }
        })
    }
    updateScore() {
        context.fillStyle = "white"
        context.font = "18px Courier"
        context.textBaseline = "top"
        context.fillText(`Score: ${this.score}`, 24, 24)
    }
    defineMouseMoveBehavior(){
        this.canvas.addEventListener("mousemove", (event) => {
            this.slicePoints.push({x: event.offsetX, y: event.offsetY})
            if (this.slicePoints.length > 4) {
                this.slicePoints.shift()
            }
        
            let wereIngredientsHit = false;
            
            this.ingredients = this.ingredients.filter((ingredient) => {
                let wasIngredientHit = ingredient.wasHit(event.offsetX, event.offsetY)
                if (wasIngredientHit) {
                    this.score +=10
                    this.sliceAudio.play()
                    wereIngredientsHit = true
                }
                return !wasIngredientHit
            })

            if (wereIngredientsHit === true){
                return
            }

            this.chickens.forEach((chicken) => {
                if (chicken.wasHit(event.offsetX, event.offsetY)){
                    this.gameOver = true;
                }
            })
        })
    }
    drawSlice() {
        if (this.slicePoints.length < 2) {
            return;
        }

        this.context.beginPath();
        this.context.strokeStyle = "white";
        this.context.lineWidth = 2;

        this.context.moveTo(this.slicePoints[0].x, this.slicePoints[0].y)
        this.slicePoints.forEach((currentPoint, index) => {
            if (index === 0) {
                return;
            }
            this.context.lineTo(currentPoint.x, currentPoint.y);
        })

        this.context.stroke();
        this.context.closePath();
    }
    endGame(){
        this.intervalIds.forEach((intervalId) => {
            clearInterval(intervalId)
        })
        cancelAnimationFrame(this.updateGameIntervalId)
        this.whenGameOver(this.score)
        this.gameAudio.pause()
    }
}