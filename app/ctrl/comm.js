
const EventEmitter = require('events');

class CommCtrl {

    constructor(spark, params) {
        this.spark = spark;
        this.actions = {};
        this.init();
    }

    init() {
        this.spark.on('data', data => {
            data = data.toString();
            console.log(data);
            let { cmd, params } = data;
            let action;
            if (action = this.actions[cmd]) {
                action(params);
            } else {
                // this.handleAction(params);
            }
        });
    }

    handleAction(params) {
        console.log('handle action:', params);
    }

    reigester(actions) {
        
    }

}

module.exports = CommCtrl;