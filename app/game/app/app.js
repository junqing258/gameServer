
const EventEmitter = require('events');
const BattleSystem = require('../system/battle');

const INTERVER = 50;
const poolSize = 10;

module.exports = class Game {

    constructor(spark) {
        this.spark = spark;
        this.system = new BattleSystem(this);
        this.emitter = new EventEmitter();

        this._deadComponents = [];
        this._newEntities = [];
        this._deadEntities = [];

        this.entities = [];
    }

    start() {
        this.timer = setInterval(() => this.tick(), INTERVER);
    }

    addEntity(ent) {
        ent.app = this;
        this._newEntities.push(ent);
        return ent;
    }

    deadEntity(ent) {
        ent.app = null;
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

            comp.app = null;
            comp.system = null;
            comp.entity = null;
        }

        this._deadComponents = [];
        this._newEntities = [];
        this._deadEntities = [];

        this.postSync();
    }

    postSync() {
        let data = {};
        for (let i = 0; i < this.entities.length; ++i) {
            if (true/* isRole */) {
                let role = this.entities[i];
                let { x, y } = role;
                data[role.uid] = { x, y };
            }
        }
        this.spark.write(JSON.stringify(data));
    }

    _initEntity(ent) {
        for (let i = 0; i < ent.comps.length; ++i) {
            let comp = ent.comps[i];
            comp.app = this;
            comp.system = this.system;
            comp.entity = ent;
            if (comp.onInit) {
                comp.onInit();
            }
            this.system.add(comp);

            this.entities.push(ent);
        }
    }

    _deadEntity(ent) {
        for (let i = 0; i < ent.comps.length; ++i) {
            let comp = ent.comps[i];
            if (comp.onDestroy) {
                comp.onDestroy();
            }
            comp.app = null;
            comp.system = null;
            comp.entity = null;
            this.system.remove(comp);
        }

        for (let i = 0; i < this.entities.length; ++i) {
            if (ent === this.entities[i]) {
                this.entities.splice(i);
                break;
            }
        }
    }

}
