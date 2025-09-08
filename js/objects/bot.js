import { OrderStatus } from "../enums/orderStatus.js";

export class Bot {
    constructor(id, system) {
        this.id = id;
        this.system = system;
        this.isBusy = false;
        this.order = null;
        this.timer = null;
        this.timeoutSecs = 10;
    }

    assignOrder(order) {
        if (!this.isBusy) {
            this.isBusy = true;
            this.order = order;
            order.status = OrderStatus.PROCESSING;
            this.timeoutSecs = 10;

            const timeOut = 10000; //10 secs
            const timer = setInterval(() => {
                if (this.timeoutSecs > 0) {
                    this.timeoutSecs--;
                    this.system.render();
                    this.system.assignOrders();
                } else {
                    clearInterval(timer);
                }
            }, 1000);

            this.timer = setTimeout(() => {
                order.status = OrderStatus.COMPLETE;
                this.isBusy = false;
                this.timer = null;
                this.order = null;

                // need to reset dom
                this.system.render();
                this.system.assignOrders();
            }, timeOut);
        }
    }

    destroy() {
        if (this.timer) {
            clearTimeout(this.timer);
            if (this.order) {
                // processing order change to pending when bot is removed
                this.order.status = OrderStatus.PENDING;
            }
            this.busy = false;
            this.order = null;
        }
    }
}