# coinbase-kit

This is Node library for [commerce.coinbase.com](https://commerce.coinbase.com)

# Features

-   Full Test coverage.
-   Support for both API Key + Secret and OAuth 2 authentication.
-   Convenient methods for making calls to the API.
-   Automatic parsing of API responses into relevant Javascript objects.
-   Adheres to the nodejs error-first callback protocol.
-   Async call

# Quick Start

### Get the API Key

The first thing you'll need to do is sign up for coinbase.Visit --dashboard.settings-- page to find Label API Keys and copy it.

### Install

```shell
yarn add coinbase-kit
// or
npm install --save coinbase-kit
```

## Making API Calls

**Init the client**

```javascript
const CoinbaseClient = reuqire("Coinbase-Kit");

const client = new CoinbaseClient({ api_key: apikey, secret_key: secretkey });
```

**Create a charge**

```javascript
const result = await client.charge.create(charge);
```

**Show a chagre**

```javascript
const code = '66BEOV2A'
const result = await client.charge.show(code);
or
const id = '1234abcd-1234-abcd-1234-abcd1234abcd'
const result = await client.charge.show(id);
```

**Get a chagre list**

```javascript
const result = await client.charge.list({});
```

**Create a checkout**
```javascript
const result = await client.checkout.create(checkout);
```

**Get a checkout**

```javascript

const result = await client.checkout.show(checkout.id);
```

**Get a checkouts list**

```javascript
const result = await client.checkout.list({});
```

**Update a checkouts list**

```javascript
const result = await client.checkout.update(Checkout);
```

**Remove a checkout**

```javascript
const result = await client.checkout.delete(checkout.id);
```

**Verify webhook**
```javascript
const isPass = client.verifyHook(headers, body);
```

## Response && Event Model

When you call ever methods , You will get response.Learn More see here for the detail.

# Error Handling

# Testing / Contributing

Any and all contributions are welcome! The process is simple:

    1. Fork this repo
    2. Make your changes and add tests
    3. Run the test suite
    4. Submit a pull request.



## My tasks of the project.

- [x] Initialization
- [x] Authentication
- [x] Charges
- [x] Checkouts
- [ ] Docs (20%)
- [ ] Demo && Example
    - [ ] Docker
    - [ ] Heroku