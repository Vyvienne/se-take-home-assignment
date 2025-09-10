import { OrderStatus } from "../enums/orderStatus.js";

export class Order {
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.status = OrderStatus.PENDING;
    }
}