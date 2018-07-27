const rp = require('request-promise');
const path = require('path');
const format = require('string-format');
const Charge = require('./charge');
module.exports = class coinbaseClient {

    /**
     * Initialize a new `CoinbaseClient`.
     * 
     * @api public 
     * 'f03c2693-c4e1-4ed5-aa4e-0d5f54973ed5'
     * '74b89c76-57ad-4156-a0d8-577f6852292c'
     */
    constructor(...{
        api_key,
        secret_key
    }) {
        this.api_key = api_key;
        this.secret_key = secret_key;
        this.root_api = 'https://api.commerce.coinbase.com';
        this.api_version = '2018-03-22';
        this.apis = {
            createCharge: {
                url: '/charges',
                method: 'post'
            },
            showCharge: {
                url: '/charges/{key}',
                method: 'get'
            },
            listCharge: {
                url: '/charges',
                method: 'get'
            }
        }
        this.charge = new Charge();
    }
    /**
     * return headers for request.
     */
    _getHeaders() {
        return {
            'Content-Type': 'application/json',
            'X-CC-Api-Key': this.api_key,
            'X-CC-Version': this.api_version,
        };
    }

    get charge() {
        return this.charge;
    }
}
