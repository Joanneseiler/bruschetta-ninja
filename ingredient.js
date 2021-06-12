class Ingredient{
    constructor(image, x, y, size){
        this.image = image;
        this.x = x;
        this.y = y;
        this.size = size;
    }
    move() {
        this.y += 1
    }
}