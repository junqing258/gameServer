
const Starter = require('../game/starter');

class GameCtrl {

    constructor(spark) {
        this.spark = spark;

        this.actions = {
            'start': this.start.bind(this)
        };
        this.init();
    }

    init() {
        this.spark.on('data', data => {
            data = JSON.parse(data.toString());
            console.log(data.cmd);
            let { cmd, parmas } = data;
            let action;
            if (action = this.actions[cmd]) {
                action(parmas);
            } else {
                // this.handleAction(parmas);
            }
        });
    }

    handleAction() {
        this.spark.on('data', data => {
            data = data.toString();
            console.log(data);
            let { cmd, parmas } = data;
            let action;
            if (action = this.actions[cmd]) {
                action(parmas);
            } else {
                // this.handleAction(parmas);
            }
        });
    }


    start() {
        console.log('====================> new game');
        this.startGame = new Starter();
    }

}

module.exports = GameCtrl;