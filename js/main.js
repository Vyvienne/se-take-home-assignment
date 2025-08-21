import { OrderType } from "./enums/orderType.js";
import { SystemManager } from "./objects/systemManager.js";

const system = new SystemManager();

document.getElementById("add-normal-order").onclick = () => system.addOrder(OrderType.NORMAL);
document.getElementById("add-vip-order").onclick = () => system.addOrder(OrderType.VIP);
document.getElementById("add-bot").onclick = () => system.addBot();
document.getElementById("remove-bot").onclick = () => system.removeBot();