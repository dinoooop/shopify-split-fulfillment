# Split Fulfillment Order
This is a test code that use Shopify GraphQL API to do the customization in unfulfilled order.
You are executing this code when an order placed with n quantity and that can't be fulfilled with one location. The code will find the inventory level that is suitable to fulfill the order.

## Installation
You need node version at least 18

First of all, copy the configurations from example env file.
```sh
cp .env.example .env
```

Modify your new .env with your configuration values.

To install all dependencies, run the following command.
```sh
npm install
```

## Test the code
Create your test order and run the following command to execute the code.
```sh
npm run move
```

## Note
This is a test code run only for the first line item in the order.