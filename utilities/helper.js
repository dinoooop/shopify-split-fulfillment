/**
 * Get the location and quantity to move
 * 
 * @param {object} lineItem Line item in the order
 * @param {string} assignedLocation Assigned location id
 * @returns 
 */
export const getMoveInfo = (lineItem, assignedLocation) => {
  const data = {};
  // Get inventory levels
  const inventoryLevels = lineItem.variant.inventoryItem.inventoryLevels.nodes;

  // Find quantity to move
  for (const inventoryLevel of inventoryLevels) {
    // for a negative inventory level of assigned location require split fulfillment
    if (
      inventoryLevel.location.id === assignedLocation &&
      inventoryLevel.quantities[0].quantity < 0
    ) {
      data.isRequireToMove = true;
      data.qtyToMove = Math.abs(inventoryLevel.quantities[0].quantity);
    }
  }

  // Find the new location to move
  if (data.isRequireToMove) {
    for (const inventoryLevel of inventoryLevels) {
      // find a location that have sufficient quantity
      if (inventoryLevel.quantities[0].quantity >= data.qtyToMove) {
        data.hasLocationToMove = true;
        data.newLocationId = inventoryLevel.location.id;
        break;
      }
    }
  }

  return data;
};
