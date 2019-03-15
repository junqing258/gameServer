
const EventEmitter = require('events');

class CommCtrl {

    constructor(spark, parmas) {
        this.spark = spark;
        this.actions = {};
        this.init();
    }

    init() {
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

    handleAction(parmas) {
        console.log('handle action:', parmas);
    }

    reigester(actions) {
        
    }

}

module.exports = CommCtrl;