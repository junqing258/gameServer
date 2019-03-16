
const Runner = require('../game/runner');

class GameCtrl {

    constructor(spark) {
        this.spark = spark;

        this.actions = {
            'start': this.start.bind(this),
        };
        this.init();
    }

    init() {
        this.spark.on('data', data => {
            data = JSON.parse(data.toString());
            console.log(data.cmd);
            let { cmd, params } = data;
            let action;
            if (action = this.actions[cmd]) {
                action(params);
            } else {
                this.handleAction(cmd, params);
            }
        });
    }

    handleAction(cmd, params) {
        this.app && this.app.emitter.emit(cmd, params);
    }

    start() {
        console.log('====================> new game');
        this.runner = new Runner(this.spark);
        this.app = this.runner.app;
    }

}

module.exports = GameCtrl;