
const BattleSystem = require('../system/battle');

const INTERVER = 50;
const poolSize = 10;

class Game {

    constructor() {
        this.system = new BattleSystem();

        this._deadComponents = [];
        this._newEntities = [];
        this._deadEntities = [];
    }

    start() {
        this.timer = setInterval(() => this.tick(), INTERVER);
    }

    addEntity(ent) {
        ent.system = this;
        this._newEntities.push(ent);
        return ent;
    }

    deadEntity(ent) {
        ent.system = null;
        this._deadEntities.push(ent);
        return ent;
    }

    deadComp(comp) {

    }

    tick() {
        this.system.tick();

        // handle dead entities
        for (let i = 0; i < this._newEntities.length; ++i) {
            this._initEntity(this._newEntities[i]);
        }

        // handle dead entities
        for (let i = 0; i < this._deadEntities.length; ++i) {
            this._deadEntity(this._deadEntities[i]);
        }

        // handle dead components
        for (let i = 0; i < this._deadComponents.length; ++i) {
            let comp = this._deadComponents[i];

            if (comp.entity.destroyed === false) {
                comp.entity.removeComp(comp);
            }

            if (comp.onDestroy) {
                comp.onDestroy();
            }

            comp.system = null;
            comp.entity = null;
        }


        this._deadComponents = [];
        this._newEntities = [];
        this._deadEntities = [];
    }

    _initEntity(ent) {
        for (let i = 0; i < ent.comps.length; ++i) {
            let comp = ent.comps[i];
            if (comp.onInit) {
                comp.onInit();
            }
            this.system.add(comp);
        }
    }

    _deadEntity(ent) {
        for (let i = 0; i < ent._comps.length; ++i) {
            let comp = ent.comps[i];
            if (comp.onDestroy) {
                comp.onDestroy();
            }
            this.system.remove(comp);
        }
    }

}

module.exports = Game;