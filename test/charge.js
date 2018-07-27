'user strict';
const assert = require('assert');
const CoinbaseClient = require('../lib/index');

describe('client', () => {
    const charge = {
        name: 'coinbaseKit',
        description: 'coinbaseKit test' + Date().toString(),
        amount: 1.01,
        currency: 'USD',
        pricing_type: 'fixed_price',
        customer_id: '2222222222',
        customer_name: 'customer',
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

    it("init a client instanct", async () => {
        const client = new CoinbaseClient(settings)
        expect(client.api_key).toBe(settings.api_key);
        expect(client.secret_key).toBe(settings.secret_key);
        expect(client.charge).toBeDefined();
    })

    it("a charge by client", async () => {
        const charge = new CoinbaseClient(settings).charge;
    })
    /**
     * Test create a charge
     */
    it("Create a charge", async () => {
        const result = await client.charge.create(charge);
        expect(result.data).not.toBe(undefined);
        expect(result.data.name).toBe(charge.name);
        expect(result.data.pricing.local.amount).toBe(charge.amount.toString());
        expect(result.data.pricing.local.currency).toBe(charge.currency);
        responseJson = result;
    })
    /**
     * Test api of get charge where code 
     * look like 'LP9BQLJB'
     */
    it("Get a charge", async () => {
        const result = await client.charge.show(responseJson.data.code);
        expect(result.data.code).toBe(responseJson.data.code);
        expect(result.data.id).toBeDefined();
        // expect(result.data.id).toBe()
    })

    /**
     * Get a list of changes
     */
    it("Get a list of changes", async () => {
        const result = await client.charge.list({});
        expect(result.pagination).toBeDefined();
        expect(result.data.lenght).not.toBe(0);
    })

})
