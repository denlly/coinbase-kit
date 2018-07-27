const rp = require('request-promise');
const path = require('path');
const format = require('string-format');
const Charge = require('./charge');
module.exports = class CoinbaseClient {

    /**
     * Initialize a new `CoinbaseClient`.
     * 
     * @api public 
     * 'f03c2693-c4e1-4ed5-aa4e-0d5f54973ed5'
     * '74b89c76-57ad-4156-a0d8-577f6852292c'
     */
    constructor({
        api_key,
        secret_key
    }) {
        this.api_key = api_key;
        this.secret_key = secret_key;
        this.root_api = 'https://api.commerce.coinbase.com';
        this.api_version = '2018-03-22';
        this._charge = null;
    }
    /**
     * return headers for request.
     */
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'X-CC-Api-Key': this.api_key,
            'X-CC-Version': this.api_version,
        };
    }

    set charge(value) {
        this._charge = value;
    }
    get charge() {
        if (!this._charge) {
            this._charge = new Charge({
                headers: this.getHeaders(),
                root_api: this.root_api,
                secret_key: this.secret_key,
            });
        }
        return this._charge;
    }
}
