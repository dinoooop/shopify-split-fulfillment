export const FETCH_ORDER_DETAILS = `
    query {
        order(id: "gid://shopify/Order/5785102483530") {
            name
            lineItems(first:1) {
                nodes {
                    id
                    quantity
                    variant {
                        id
                        inventoryItem {
                            id
                            inventoryLevels(first:35) {
                                nodes {
                                    location {
                                        id
                                        name
                                    }
                                    quantities(names:["available"]) {
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
                    lineItems(first:1) {
                        nodes {
                            id
                        }
                    }
                }
            }
            fulfillments {
                location {
                    id
                }
            }
        }
    }
`;
