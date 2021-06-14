class Chicken{
    constructor(image, x, y, size){
        this.image = image;
        this.x = x;
        this.y = y;
        this.size = size;
    }
    move() {
        this.y += 3
    }
    wasHit(x, y){
        let withinX = x >= this.x && x <= this.x + this.size
        let withinY = y >= this.y && y <= this.y + this.size
        return withinX && withinY
    }
}