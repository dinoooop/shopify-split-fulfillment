import { GraphQLClient, gql } from "graphql-request";
import { config } from "dotenv";
config();

const endpoint = `https://${process.env.SHOPIFY_STORE}/admin/api/${process.env.SHOPIFY_VERSION}/graphql.json`;

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
  },
});