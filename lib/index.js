const rp = require('request-promise');
const path = require('path');
const format = require('string-format');
module.exports = class coinbaseClient {

    /**
     * Initialize a new `CoinbaseClient`.
     *
     * @api public
     */
    constructor() {
        this.api_key = 'f03c2693-c4e1-4ed5-aa4e-0d5f54973ed5';
        this.secret_key = '74b89c76-57ad-4156-a0d8-577f6852292c';
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

    /**
     * create a charge
     * @param {
     *              name:'',
     *              description:'', 
     *              amount:,
     *              currency:'',        USD|CNY
     *              pricing_type:       fixed_price|no_price,
     *              customer_id:'',
     *              customer_name:'',
     *          } charge
     * return: {}
     */
    create(charge) {
        var options = {
            method: this.apis.createCharge.method,
            uri: `${this.root_api}${this.apis.createCharge.url}`,
            json: true,
            body: {
                name: charge.name,
                description: charge.description,
                local_price: {
                    amount: charge.amount.toFixed(2),
                    currency: charge.currency,
                },
                pricing_type: charge.pricing_type,
                metadata: {
                    customer_id: `id_${charge.customer_id}`,
                    customer_name: charge.customer_name,
                },
            },
            headers: this._getHeaders(),
        }
        return rp(options);
    }

    /**
     * Get a charge
     * @param string chargeKey 
     * return promise
     */
    show(chargeKey) {
        const options = {
            uri: this.root_api + format(this.apis.showCharge.url, {
                key: chargeKey
            }),
            json: true,
            headers: this._getHeaders(),
        };
        delete options.headers['Content-Type'];
        console.log(JSON.stringify(options));
        return rp(options);
    }

    /**
     * 
     * @param { limit, startAfter ,endingBefore, isAll} params 
     */
    list(params) {
        const options = {
            method: this.apis.listCharge.method,
            uri: this.root_api + this.apis.listCharge.url,
            json: true,
            body: {
                limit: params.limit,
                starting_after: params.startAfter,
                ending_before: params.endingBefore,
                scope: params.isAll ? undefined : 'without-failed-payments',
            },
            headers: this._getHeaders(),
        };
        console.log(JSON.stringify(options));
        return rp(options);

    }
}
