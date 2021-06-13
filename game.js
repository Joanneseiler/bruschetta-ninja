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
        }, 2000)
        this.defineIngredientClickBehavior()
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
    updateGame(){
        context.clearRect(0, 0, canvas.width, canvas.height)
        this.ingredients.forEach((ingredient) => {
            context.drawImage(ingredient.image, ingredient.x, ingredient.y, ingredient.size, ingredient.size)
            ingredient.move()
            if (ingredient.y >= this.canvas.height - ingredient.size) {
                this.gameOver = true;
            }
        })

        context.fillStyle = "#0C0545"
        context.font = "18px Courier"
        context.textBaseline = "top"
        context.fillText(`Score: ${this.score}`, 24, 24)

        if (this.gameOver === true) {
            this.endGame()
            return;
        }

        this.updateGameIntervalId = requestAnimationFrame(() => this.updateGame())
    }
    defineIngredientClickBehavior(){
        this.canvas.addEventListener("click", (event) => {
            this.ingredients = this.ingredients.filter((ingredient) => {
                if (ingredient.wasHit(event.offsetX, event.offsetY)) {
                    this.score +=10
                }
                return !ingredient.wasHit(event.offsetX, event.offsetY)
            })
        })
    }
    endGame(){
        clearInterval(this.spawnIntervalId)
        cancelAnimationFrame(this.updateGameIntervalId)
        this.whenGameOver(this.score)
    }
}