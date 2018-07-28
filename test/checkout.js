'user strict';
const assert = require('assert');
const CoinbaseClient = require('../lib/index');

describe('client', () => {
    const checkout = {
        name: 'coinbaseKit',
        description: 'coinbaseKit test' + Date().toString(),
        amount: 1.01,
        currency: 'USD',
        pricing_type: 'fixed_price', // fixed_price | no_price
        requested_info: ['email', 'name'], //
    };
    const settings = {
        api_key: 'f03c2693-c4e1-4ed5-aa4e-0d5f54973ed5',
        secret_key: '74b89c76-57ad-4156-a0d8-577f6852292c',
    }
    let responseJson = {};
    let client;

    beforeAll(async () => {
        client = new CoinbaseClient(settings);
    })

    /**
     * Test create a checkout
     */
    it("Create a checkout", async () => {
        const result = await client.checkout.create(checkout);
        expect(result.data).not.toBe(undefined);
        expect(result.data.name).toBe(checkout.name);
        expect(result.data.local_price.amount).toBe(checkout.amount.toString());
        expect(result.data.local_price.currency).toBe(checkout.currency);
        responseJson = result;
    })
    /**
     * Test api of get checkout where code 
     * look like 'LP9BQLJB'
     */
    it("Get a checkout", async () => {
        const result = await client.checkout.show(responseJson.data.id);
        expect(result.data.id).toBeDefined();
        // expect(result.data.id).toBe()
    })

    /**
     * Get a list of changes
     */
    it("Get a list of checkouts", async () => {
        const result = await client.checkout.list({});
        expect(result.pagination).toBeDefined();
        expect(result.data.lenght).not.toBe(0);
    })

    it("Update the checkout", async () => {
        const updateCheckout = Object.assign({
            id: responseJson.data.id
        }, checkout);
        console.log(updateCheckout);
        const result = await client.checkout.update(updateCheckout);
        console.log(result);
    })

    it("Remove the checkout", async () => {
        const result = await client.checkout.delete(responseJson.data.id);
        expect(200);
    })
})
