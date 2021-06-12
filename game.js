class Game {
    constructor(canvas, context){
        this.score = 0;
        this.ingredients = [];
        this.chickens = [];
        this.gameOver = false;
        this.hasStarted = false;
        this.canvas = canvas;
        this.context = context;
    }
    start(){
        this.hasStarted = true;
        setInterval(() => {
            this.spawnIngredient()
        }, 2000)
        this.updateGame()
    }
    spawnIngredient(){
        let ingredientImage = new Image();
        ingredientImage.src = "./images/tomato.png"
        
        let ingredient = new Ingredient(
            ingredientImage, 
            Math.random() * (canvas.width - ingredientImage.width), 
            -ingredientImage.height, 
            64
        );

        this.ingredients.push(ingredient)
    }
    updateGame(){
        context.clearRect(0, 0, canvas.width, canvas.height)
        this.ingredients.forEach((ingredient) => {
            context.drawImage(ingredient.image, ingredient.x, ingredient.y, ingredient.size, ingredient.size)
            ingredient.move()
        })
        requestAnimationFrame(() => this.updateGame())
    }
}


