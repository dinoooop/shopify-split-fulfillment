export const FETCH_ORDER_BY_ID = `
    query FetchOrderDetails($orderId: ID!) {
        order(id: $orderId) {
            name
            lineItems(first: 1) {
                nodes {
                    id
                    quantity
                    variant {
                        id
                        inventoryItem {
                            id
                            inventoryLevels(first: 35) {
                                nodes {
                                    location {
                                        id
                                        name
                                    }
                                    quantities(names: ["available"]) {
                                        quantity
                                    }
                                }
                            }
                        }
                    }
                }
            }
            fulfillmentOrders(first:1) {
                nodes {
                    id
                    assignedLocation {
                        location{
                            id
                        }
                    }
                    lineItems(first:1) {
                        nodes 
                        {
                            id
                        }
                    }
                }
            }
        }
    }
`;
