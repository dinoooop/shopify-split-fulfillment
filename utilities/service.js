import { FETCH_ORDER_BY_ID } from "../queries/fetch-order-by-id.js";
import { MOVE_ORDER } from "../queries/move-order.js";
import { shopifyClient } from "./shopifyClient.js";

/**
 * Retrieves order details by ID from the Shopify API
 *
 * @param {string} id - The unique ID of the order to be fetched.
 * @returns {Promise<Object>} - Order details
 */
export async function getOrder(id) {
  try {
    const data = await shopifyClient.request(FETCH_ORDER_BY_ID, {
      orderId: id,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Execute fulfillment order move mutation
 *
 * @param {object} id - param parameters required to execute fulfillment order move mutation
 * @returns {Promise<Object>} - Fulfillment order move details
 */
export async function moveToNewLocation(param) {
  try {
    const data = await shopifyClient.request(MOVE_ORDER, param);
    return data;
  } catch (error) {
    throw error;
  }
}
