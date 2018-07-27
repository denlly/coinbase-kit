'user strict';
const assert = require('assert');
const CoinbaseClient = require('../lib/index');

describe('client', () => {
    const settings = {
        api_key: 'f03c2693-c4e1-4ed5-aa4e-0d5f54973ed5',
        secret_key: '74b89c76-57ad-4156-a0d8-577f6852292c',
    }
    /**
     * 
     */
    let responseJson = {};
    let client;

    beforeAll(async () => {})

    it("init a client instanct", async () => {
        const client = new CoinbaseClient(settings)
        expect(client.api_key).toBe(settings.api_key);
        expect(client.secret_key).toBe(settings.secret_key);
        expect(client.charge).toBeDefined();
    })

    it("the setter of charge by client", async () => {
        const charge = new CoinbaseClient(settings).charge;
        expect(charge).not.toBeNull();
    })

    it("the setter of checkout by clinet", async () => {
        const checkout = new CoinbaseClient(settings).checkout;
        expect(checkout).not.toBeNull();
    })
})
