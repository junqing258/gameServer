
const CommCtrl = require('./comm');
const GameCtrl = require('./game');

class Controller {

    constructor(spark) {
        this.spark = spark;
        // this.commCtrl = new CommCtrl(spark);
        this.gameCtrl = new GameCtrl(spark);
    }

}

module.exports = Controller;