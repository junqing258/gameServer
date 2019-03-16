
const Game = require('./app/game');
const Role = require('./entity/role');

module.exports = class Starter {

    constructor() {
        this.game = new Game();
        this.init();
    }

    init() {
        this.game.start();

        for (let i=0; i<4; i++) {
            let role = new Role();
            this.game.addEntity(role);
        }
    }

}

