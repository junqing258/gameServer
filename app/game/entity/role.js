
const Mover = require('./../comp/mover');


class Role {

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

module.exports = Role;