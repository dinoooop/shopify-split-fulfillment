export const MOVE_ORDER = `
mutation fulfillmentOrderMove($id: ID!, $newLocationId: ID!, $fulfillmentOrderLineItems: [FulfillmentOrderLineItemInput!]) {
  fulfillmentOrderMove(id: $id, newLocationId: $newLocationId, fulfillmentOrderLineItems: $fulfillmentOrderLineItems) {
    movedFulfillmentOrder {
      id
      status
    }
    originalFulfillmentOrder {
      id
      status
    }
    remainingFulfillmentOrder {
      id
      status
    }
    userErrors {
      field
      message
    }
  }
}
`;
