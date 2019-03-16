

module.exports = class Mover {

    constructor() {
        this.x = 0;
        this.y = 0;

        this.mx = 0;
        this.my = 0;
    }

    onInit() {
        console.log('Mover onInit:');
        this.app.emitter.on('go', this.go.bind(this));
        this.app.emitter.on('stop', this.go.bind(this));
    }

    update() {
        this.x += this.mx;
        this.y += this.my;

        this.entity.x = this.x;
        this.entity.y = this.y;

        // console.log(this.x, this.y)
    }

    go(params) {
        if (this.entity /* && this.entity.uid==params.uid */) {
            this.mx = params.mx;
            this.my = params.my;
        }
    }

    stop(params) {

    }

    onDestroy() {
        console.log('Mover onDestroy:');
    }

}
 