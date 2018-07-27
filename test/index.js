'user strict';
const assert = require('assert');
const coinbaseClinet = require('../lib/index');

describe('client', () => {
    const charge = {
        name: 'coinbaseKit',
        description: 'coinbaseKit test',
        amount: 1.01,
        currency: 'USD',
        pricing_type: 'fixed_price',
        customer_id: '2222222222',
        customer_name: 'customer',
    };
    let responseJson = {};
    let client;

    beforeAll(async () => {
        client = new coinbaseClinet();
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
        console.log(result);
        expect(result.data.code).toBe(responseJson.data.code);
        expect(result.data.id).toBeDefined();
        // expect(result.data.id).toBe()
    })

    /**
     * Get a list of changes
     */
    it("Get a list of changes", async () => {
        const result = await client.list({});
        console.log(result);
        expect(result.pagination).toBeDefined();
        expect(result.data.lenght).not.toBe(0);
    })

})
