export class Bot {
    constructor(id, system) {
        this.id = id;
        this.system = system;
        this.isBusy = false;
        this.order = null;
        this.timer = null;
    }

    assignOrder(order) {

    }

    destroy() {

    }
}