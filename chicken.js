class Chicken{
    constructor(image, x, y){
        this.image = image;
        this.x = x;
        this.y = y;
    }
    move() {
        this.y += 1
    }
    wasHit(x, y){
        let withinX = x >= this.x && x <= this.x + this.width
        let withinY = y >= this.y && y <= this.y + this.height
        return withinX && withinY
    }
}