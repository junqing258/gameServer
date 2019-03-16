
const Mover = require('./../comp/mover');


module.exports = class Role {

    constructor(uid) {
        this.uid = uid;
        this.comps = [];
        this.system = null;
        this.addComp(new Mover());
    }

    addComp(comp) {
        this.comps.push(comp);
    }

}