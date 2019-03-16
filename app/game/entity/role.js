
const Mover = require('./../comp/mover');


module.exports = class Role {

    constructor() {
        this.comps = [];
        this.system = null;
        this.addComp(new Mover());
    }

    addComp(comp) {
        comp.entity = this;
        this.comps.push(comp);
    }

}