class Game {
    constructor(canvas, context, whenGameOver){
        this.score = 0;
        this.ingredients = [];
        this.chickens = [];
        this.gameOver = false;
        this.canvas = canvas;
        this.context = context;
        this.spawnIntervalId = null;
        this.updateGameIntervalId = null;
        this.whenGameOver = whenGameOver;
    }
    start(){
        this.spawnIntervalId = setInterval(() => {
            this.spawnIngredient()
            this.spawnChicken()
        }, 2000)
        this.defineClickBehavior()
        this.updateGame()
    }
    spawnIngredient(){
        let ingredientImage = new Image();
        ingredientImage.src = "./images/tomato.png"
        ingredientImage.width = 64;
        ingredientImage.height = 64;
        
        let ingredient = new Ingredient(
            ingredientImage, 
            Math.random() * (canvas.width - ingredientImage.width), 
            -ingredientImage.height, 
            ingredientImage.width
        );

        this.ingredients.push(ingredient)
    }
    spawnChicken(){
        let chickenImage = new Image();
        chickenImage.src = "./images/chicken.png"
        
        let chicken = new Chicken(
            chickenImage,
            Math.random() * (canvas.width - chickenImage.naturalWidth),
            -chickenImage.height,
            chickenImage.width
        );

        this.chickens.push(chicken)
    }
    updateGame(){
        // clear Canvas:
        context.clearRect(0, 0, canvas.width, canvas.height)

        // Huhn ins Bild reinfallen lassen:
        this.chickens.forEach((chicken) => {
            context.drawImage(chicken.image, chicken.x, chicken.y)
            chicken.move()
        })

        // Zutaten malen, ins Bild reinfallen lassen und wann Spiel vorbei:
        this.ingredients.forEach((ingredient) => {
            context.drawImage(ingredient.image, ingredient.x, ingredient.y, ingredient.size, ingredient.size)
            ingredient.move()
            if (ingredient.y >= this.canvas.height - ingredient.size) {
                this.gameOver = true;
            }
        })

        // Score:
        context.fillStyle = "white"
        context.font = "18px Courier"
        context.textBaseline = "top"
        context.fillText(`Score: ${this.score}`, 24, 24)

        // GameOver:
        if (this.gameOver === true) {
            this.endGame()
            return;
        }
        // 60 Mal pro Sekunde:
        this.updateGameIntervalId = requestAnimationFrame(() => this.updateGame())
    }
    defineClickBehavior(){
        this.canvas.addEventListener("click", (event) => {
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
    endGame(){
        clearInterval(this.spawnIntervalId)
        cancelAnimationFrame(this.updateGameIntervalId)
        this.whenGameOver(this.score)
    }
}