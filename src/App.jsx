import { OrderType } from "./js/enums/orderType.js";
import { SystemManager } from "./js/objects/systemManager.js";
import './App.css'

function App() {
  const system = new SystemManager();

  const handleNormalOrder = () => {
    system.addOrder(OrderType.NORMAL);
  };

  const handleVIPOrder = () => {
    system.addOrder(OrderType.VIP);
  };

  const handleAddBot = () => {
    system.addBot();
  };

  const handleRemoveBot = () => {
    system.removeBot();
  };

  return (
    <>
      <div id="app">
        <center>
          <h3>COOKINGBOT ORDER SYSTEM</h3>
        </center>
        <div id="system-container">
          <div id="container">
            <div>
              <div id="pending"></div>
              <center>
                <h4>PENDING ORDERS</h4>
                <button id="add-normal-order" onClick={handleNormalOrder}>NEW NORMAL ORDER</button>
                <br />
                <button id="add-vip-order" onClick={handleVIPOrder}>NEW VIP ORDER</button>
              </center>
            </div>

            <div>
              <div id="complete"></div>
              <center>
                <h4>COMPLETED ORDERS</h4>
              </center>
            </div>

            <div>
              <div id="bots"></div>
              <center>
                <h4>AVAILABLE BOTS</h4>
                <button id="add-bot" onClick={handleAddBot}>+ BOT</button>
                <br />
                <button id="remove-bot" onClick={handleRemoveBot}>- BOT</button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
