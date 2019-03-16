

module.exports = class Mover {

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    onInit() {
        console.log('onInit');
    }

    update() {
        this.x += 1;
        this.y += 1;

        this.entity.x = this.x;
        this.entity.y = this.y;

        console.log(this.x, this.y)
    }

    onDestroy() {
        console.log('onDestroy');
    }

}
 