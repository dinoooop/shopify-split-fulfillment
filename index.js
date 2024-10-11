import { getMoveInfo } from "./utilities/helper.js";
import { getOrders, moveOrder } from "./utilities/service.js";

async function run() {
  try {
    const data = await getOrders();
    const lineItem = data.order.lineItems.nodes[0];
    const fulfillmentOrder = data.order.fulfillmentOrders.nodes[0];
    const assignedLocation = fulfillmentOrder.assignedLocation.location.id;
    const moveInfo = getMoveInfo(lineItem, assignedLocation);

    if (moveInfo.isRequireToMove) {
      console.log("Need fulfillment order move");
      const fulfillmentOrderIdToBeMoved = fulfillmentOrder.id;
      const fulfillmentOrderLineItemId = fulfillmentOrder.lineItems.nodes[0].id;
      const fulfillmentOrderLineItemQty = moveInfo.qtyToMove;

      console.log("assignedLocation", assignedLocation);
      console.log("fulfillmentOrderIdToBeMoved", fulfillmentOrderIdToBeMoved);
      console.log("fulfillmentOrderLineItemId", fulfillmentOrderLineItemId);
      console.log("fulfillmentOrderLineItemQty", fulfillmentOrderLineItemQty);

      if (moveInfo.hasLocationToMove) {
        moveOrder({
          id: fulfillmentOrderIdToBeMoved,
          newLocationId: moveInfo.newLocationId,
          fulfillmentOrderLineItems: {
            id: fulfillmentOrderLineItemId,
            quantity: fulfillmentOrderLineItemQty,
          },
        });
      } else {
        console.log("No location to move");
      }
    } else {
      console.log("Not need fulfillment order move");
    }
  } catch (error) {
    console.error(error);
  }
}
run();
