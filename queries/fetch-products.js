export const FETCH_PRODUCTS = `
    query {
        
    products(first: 2, reverse: true) {
        edges {
            node {
                id
                title
                description
                options {
                    id
                    name
                    values
                }
                variants(first: 100) {
                    edges {
                        node {
                            sku
                            id
                            inventoryQuantity
                            price
                        }
                    }
                }
            }
        }
    }

    }
`;
