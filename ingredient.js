class Ingredient{
    constructor(image, x, y, size, speedX, speedY){
        this.image = image;
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    wasHit(x, y) {
        let withinX = x >= this.x && x <= this.x + this.size
        let withinY = y >= this.y && y <= this.y + this.size
        return withinX && withinY  
    }
    increaseSpeedY(amount) {
        this.speedY += amount;
    }
}