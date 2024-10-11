import { getMoveInfo } from "./utilities/helper.js";
import { getOrder, moveToNewLocation } from "./utilities/service.js";

(async function () {
  {
    try {
      // set your Shopify order id here
      const orderId = "gid://shopify/Order/5786564001866";
      const data = await getOrder(orderId);

      // This code is for orders that contains only one line item
      // Set the required variables from orders
      const lineItem = data.order.lineItems.nodes[0];
      const fulfillmentOrder = data.order.fulfillmentOrders.nodes[0];
      const assignedLocation = fulfillmentOrder.assignedLocation.location.id;

      // Get the location and quantity to move
      const moveInfo = getMoveInfo(lineItem, assignedLocation);

      if (moveInfo.isRequireToMove) {
        console.log("Need fulfillment order move");
        const fulfillmentOrderIdToBeMoved = fulfillmentOrder.id;
        const fulfillmentOrderLineItemId =
          fulfillmentOrder.lineItems.nodes[0].id;
        const fulfillmentOrderLineItemQty = moveInfo.qtyToMove;

        console.log("assignedLocation", assignedLocation);
        console.log("fulfillmentOrderIdToBeMoved", fulfillmentOrderIdToBeMoved);
        console.log("fulfillmentOrderLineItemId", fulfillmentOrderLineItemId);
        console.log("fulfillmentOrderLineItemQty", fulfillmentOrderLineItemQty);

        if (moveInfo.hasLocationToMove) {
          // Execute graphql mutation to move fulfillment order
          moveToNewLocation({
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
        console.log("Not need a fulfillment order move");
      }
    } catch (error) {
      console.error(error);
    }
  }
})();
