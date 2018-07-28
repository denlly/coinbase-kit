## Installation

coinbase-kit requires node V8.11 or higher for ES2015 and async function support.

You can quickly install a supported version of node with you favorite version manager:

```javascript
nvm install 8.11
```

install coinbase-kit

```shell
yarn add coinbase-kit
```

Before coding,you must have a coinbase apikey.[signin](!https://commerce.coinbase.com/signin) or [signup](!https://commerce.coinbase.com/signup). And open page 'settings' and you can see it.
Next, Let's getting start:

```javascript
const CoinbaseClient = require("coinbase-kit");

// init a coinbase client
const client = new CoinbaseClient({
    api_key: "12345678-1234-1234-1234-0d5f54973ed5"
});

const charge = {
    name: "coinbaseKit",
    description: "coinbaseKit test",
    amount: 1.01, // the type of string or number
    currency: "USD",
    pricing_type: "fixed_price", //Enum fixed_price | no_price
    customer_id: "123456789", //user id in your app
    customer_name: "customer" // user name in your app
};
const result = await client.charge.create(charge);

console.log(result)
```

We got a Json, as [this](https://commerce.coinbase.com/docs/api/#create-a-charge).Property ==id== and ==code== is very importent.

Get one charge.

```javascript
const CoinbaseClient = require("coinbase-kit");

const client = new CoinbaseClient({
    api_key: "12345678-1234-1234-1234-0d5f54973ed5"
});
// init a coinbase client
const id = "12345678-1234-1234-1234-0d5f54973ed5";
const result = await client.charge.show(id);
```

The result is Json of charge info. Summer you can see [here](https://commerce.coinbase.com/docs/api/#show-a-charge)

Get charge list.

```
const CoinbaseClient = require("coinbase-kit");

const client = new CoinbaseClient({
    api_key: "12345678-1234-1234-1234-0d5f54973ed5"
});
// init a coinbase client
const param= {
    limit,  //default and max 25
    startAfter,
    endingBefore,
    isAll // isAll value equal false.It mean's return charge that status is succeed
};
const result = await client.charge.list(param);
```
