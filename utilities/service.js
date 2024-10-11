import { GraphQLClient, gql } from "graphql-request";
import fs from "fs";
import { config } from "dotenv";
import { FETCH_ORDER_BY_ID } from "../queries/fetch-order-by-id.js";
import { MOVE_ORDER } from "../queries/move-order.js";
config();

const endpoint = `https://${process.env.SHOPIFY_STORE}/admin/api/${process.env.SHOPIFY_VERSION}/graphql.json`;

const client = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
  },
});

export async function getOrders() {
  try {
    const data = await client.request(FETCH_ORDER_BY_ID, {
      orderId: process.env.ORDER_ID,
    });
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync("./log/order.json", jsonData, "utf-8");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function moveOrder(param) {
  try {
    const data = await client.request(MOVE_ORDER, param);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync("./log/move.json", jsonData, "utf-8");
    return data;
  } catch (error) {
    console.error(error);
  }
}
