import fs from "fs";
import { FETCH_ORDER_BY_ID } from "../queries/fetch-order-by-id.js";
import { MOVE_ORDER } from "../queries/move-order.js";
import { shopifyClient } from "./shopifyClient.js";

export async function getOrders() {
  try {
    const data = await shopifyClient.request(FETCH_ORDER_BY_ID, {
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
    const data = await shopifyClient.request(MOVE_ORDER, param);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync("./log/move.json", jsonData, "utf-8");
    return data;
  } catch (error) {
    console.error(error);
  }
}
