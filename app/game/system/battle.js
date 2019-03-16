
const Mover = require('./../comp/mover');

const COMPS = [Mover];

module.exports = class BattleSystem {

    constructor() {
        this._enabled = true;

        this._id = '';
        this._componentCls = {};

        for (let compCls of COMPS) {
            this._componentCls[compCls.name] = [];
        }

        this.init();
    }

    init() {

    }

    add(comp) {
        for (let compCls of COMPS) {
            if (comp instanceof compCls) {
                this._componentCls[compCls.name].push(comp);
                break;
            }
        }
    }

    remove(comp) {
        for (let compCls of COMPS) {
            if (comp instanceof compCls) {
                let _components = this._componentCls[compCls.name];
                for (let i = 0; i < _components.length; ++i) {
                    let component = _components[i];
                    if (component === comp) {
                        _components.slice(i);
                        break;
                    }
                }
                break;
            }
        }
    }

    tick() {
        for (let compCls of COMPS) {
            let _components = this._componentCls[compCls.name];
            for (let i = 0; i < _components.length; ++i) {
                let comp = _components[i];
                comp.update && comp.update();
            }
        }
    }

}
