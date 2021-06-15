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
    }
    start(){
        this.intervalIds.push(setInterval(() => {
            this.spawnIngredient()
        }, 2000))

        this.intervalIds.push(setInterval(() => {
            this.spawnChicken()
        }, 4000))

        this.intervalIds.push(setInterval(() => {
            this.slicePoints.shift()
        }, 50))

        this.defineMouseMoveBehavior()
        this.updateGame()
    }
    spawnIngredient(){
        let tomatoImage = new Image();
        tomatoImage.src = "./images/tomato.png";
        tomatoImage.width = 64;
        tomatoImage.height = 64;
        
        let tomato = new Ingredient(
            tomatoImage,
            Math.random() * (canvas.width - tomatoImage.width),
            -tomatoImage.height,
            tomatoImage.width, (Math.random() * 2) + 2
        );
        
        let onionImage = new Image();
        onionImage.src = "./images/onion.png";
        onionImage.width = 64;
        onionImage.height = 64;

        let onion = new Ingredient(
            onionImage,
            Math.random() * (canvas.width - onionImage.width),
            - onionImage.height,
            onionImage.width, (Math.random() * 2) + 2
        )

        let breadImage = new Image();
        breadImage.src = "./images/bread.png";
        breadImage.width = 80;
        breadImage.height = 80;
        
        let bread = new Ingredient(
            breadImage,
            Math.random() * (canvas.width - breadImage.width),
            - breadImage.height,
            breadImage.width, (Math.random() * 2) + 2
        )

        let possibleIngredients = [tomato, onion, bread]
        let randomAmount = Math.round((Math.random() * 3) + 1)
        for (let i = 0; i < randomAmount; i++) {
            let randomIndex = Math.floor(Math.random() * possibleIngredients.length)
            this.ingredients.push(possibleIngredients[randomIndex])
        }

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
            if (ingredient.y >= this.canvas.height - ingredient.size) {
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
    }
}