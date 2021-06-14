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
        let tomatoImage = new Image();
        tomatoImage.src = "./images/tomato.png";
        tomatoImage.width = 64;
        tomatoImage.height = 64;
        
        let tomato = new Ingredient(
            tomatoImage,
            Math.random() * (canvas.width - tomatoImage.width),
            -tomatoImage.height,
            tomatoImage.width
        );
        
        let onionImage = new Image();
        onionImage.src = "./images/onion.png";
        onionImage.width = 64;
        onionImage.height = 64;

        let onion = new Ingredient(
            onionImage,
            Math.random() * (canvas.width - onionImage.width),
            - onionImage.height,
            onionImage.width
        )

        let breadImage = new Image();
        breadImage.src = "./images/bread.png";
        breadImage.width = 80;
        breadImage.height = 80;
        
        let bread = new Ingredient(
            breadImage,
            Math.random() * (canvas.width - breadImage.width),
            - breadImage.height,
            breadImage.width
        )
        
        this.ingredients.push(tomato, onion, bread)
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
        this.canvas.addEventListener("mousemove", (event) => {
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