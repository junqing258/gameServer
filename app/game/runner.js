
const App = require('./app/app');
const Role = require('./entity/role');

module.exports = class Runner {

    constructor(spark) {
        this.app = new App(spark);
        this.init();
    }

    init() {
        this.app.start();

        for (let i=0; i<4; i++) {
            let role = new Role(i);
            this.app.addEntity(role);
        }
    }


}

