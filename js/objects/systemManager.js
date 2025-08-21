import { OrderStatus } from "../enums/orderStatus.js";
import { OrderType } from "../enums/orderType.js";
import { Order } from "../objects/order.js";
import { Bot } from "../objects/bot.js";

export class SystemManager {
    constructor() {
        this.orders = [];
        this.bots = [];
        this.orderId = 1;
    }

    render() {
        const pendingArea = document.getElementById("pending");
        const completedArea = document.getElementById("complete");
        const botsArea = document.getElementById("bots");
        if (!pendingArea | !completedArea | !botsArea) {
            return;
        }

        pendingArea.innerHTML = "<h2>PENDING AREA</h2>";
        completedArea.innerHTML = "<h2>COMPLETED ORDERS</h2>";
        botsArea.innerHTML = "<h2>AVAILABLE BOTS</h2>";

        this.orders.forEach(o => {
            const element = document.createElement("div");
            element.className = "order";
            element.textContent = `${o.type} ORDER #${o.id}`
            if (o.status === OrderStatus.PENDING) {
                element.textContent += ' (PENDING)';
                pendingArea.appendChild(element);
            }
            else if (o.status === OrderStatus.PROCESSING) {
                element.textContent += ' (PROCESSING)';
                pendingArea.appendChild(element);
            }
            else {
                element.textContent += ' (COMPLETED)';
                completedArea.appendChild(element);
            }
        });

        this.bots.forEach(b => {
            const element = document.createElement("div");
            element.className = "bot";
            element.textContent = `BOT #${b.id} (${b.isBusy ? "BUSY" : "IDLE"})`;
            botsArea.appendChild(element);
        });
    }

    assignOrders() {
        this.bots.forEach(b => {
            if (!b.isBusy) {
                const order = this.orders.find(o => o.status === OrderStatus.PENDING);
                if (order) {
                    b.assignOrder(order);
                }
            }
        });
        this.render();
    }

    addOrder(orderType) {
        const order = new Order(this.orderId++, orderType);
        if (orderType === OrderType.VIP) {
            // get index of the order and add vip order above the normal order
            // order status should not be processing
            const index = this.orders.findIndex(o => o.type === OrderType.NORMAL && o.status === OrderStatus.PENDING);
            if (index === -1) {
                this.orders.push(order);
            } else {
                // add new order above existing normal ones
                this.orders.splice(index, 0, order);
            }
        }
        else {
            this.orders.push(order);
        }
        this.render();
        this.assignOrders(); // check if there are bots to process order
    }

    addBot() {
        const bot = new Bot(this.bots.length + 1, this);
        this.bots.push(bot);
        this.render();
        this.assignOrders(); // check if there are existing orders to be processed
    }

    removeBot() {
        if (this.bots.length > 0) {
            const bot = this.bots.pop();
            bot.destroy();
            this.render();
            this.assignOrders(); // check if there are still bots to process the current processing orders
        }
    }
}