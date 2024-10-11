export const getMoveInfo = (lineItem, assignedLocation) => {
  const data = {};
  data.quantity = lineItem.quantity;
  const inventoryLevels = lineItem.variant.inventoryItem.inventoryLevels.nodes;
  for (const inventoryLevel of inventoryLevels) {
    if (
      inventoryLevel.location.id === assignedLocation &&
      inventoryLevel.quantities[0].quantity < 0
    ) {
      data.isRequireToMove = true;
      data.qtyToMove = Math.abs(inventoryLevel.quantities[0].quantity);
    }
  }

  if (data.isRequireToMove) {
    for (const inventoryLevel of inventoryLevels) {
      if (inventoryLevel.quantities[0].quantity >= data.qtyToMove) {
        data.hasLocationToMove = true;
        data.newLocationId = inventoryLevel.location.id;
        break;
      }
    }
  }

  return data;
};
