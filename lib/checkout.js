const rp = require('request-promise');
const format = require('string-format');
const ClientBase = require('./clientBase')
module.exports = class Checkout extends ClientBase {
    constructor(settings) {
        super(settings);
        this.apis = {
            createCheckout: {
                url: '/checkouts',
                method: 'post',
            },
            showCheckout: {
                url: '/checkouts/{key}',
                method: 'get',
            },
            updateCheckout: {
                url: '/checkouts/{key}',
                method: 'put',
            },
            listCheckout: {
                url: '/checkouts',
                method: 'get',
            },
            deleteCheckout: {
                url: '/checkouts/{key}',
                method: 'delete'
            }
        }
    }

    /**
     * create a charge
     * @param {
     *              name:'',
     *              description:'', 
     *              amount:,
     *              currency:'',        USD|CNY
     *              pricing_type:       fixed_price|no_price,
     *              requested_info:[string...],
     *          } checkout
     * return: {}
     */
    create(checkout) {
        var options = {
            method: this.apis.createCheckout.method,
            uri: `${this.root_api}${this.apis.createCheckout.url}`,
            json: true,
            body: {
                "name": checkout.name,
                "description": checkout.description,
                "local_price": {
                    "amount": checkout.amount.toFixed(2),
                    "currency": checkout.currency,
                },
                "pricing_type": checkout.pricing_type,
                "requested_info": checkout.requested_info,
            },
            headers: this.headers,
        }
        return rp(options);
    }

    /**
     * Get a checkout
     * @param string checkoutKey 
     * return promise
     */
    show(id) {
        const options = {
            method: this.apis.showCheckout.method,
            uri: this.root_api + format(this.apis.showCheckout.url, {
                key: id
            }),
            json: true,
            headers: this.headers,
        };
        delete options.headers['Content-Type'];
        return rp(options);
    }

    /**
     * 
     * @param { limit, startAfter ,endingBefore, isAll} params 
     */
    list(params) {
        const options = {
            method: this.apis.listCheckout.method,
            uri: this.root_api + this.apis.listCheckout.url,
            json: true,
            body: {
                limit: params.limit,
                starting_after: params.startAfter,
                ending_before: params.endingBefore,
                scope: params.isAll ? undefined : 'without-failed-payments',
            },
            headers: this.headers,
        };
        return rp(options);
    }

    /**
     * 
     * @param {id:uuid,name:string,description:string,amount:1.01,currency:'USD','CNY',requested_info:['email','name']
     */
    update(checkout) {
        var options = {
            method: this.apis.updateCheckout.method,
            uri: this.root_api + format(this.apis.updateCheckout.url, {
                key: checkout.id
            }),
            json: true,
            body: {
                "name": checkout.name,
                "description": checkout.description,
                "local_price": {
                    "amount": checkout.amount.toFixed(2),
                    "currency": checkout.currency,
                },
                "requested_info": checkout.requested_info,
            },
            headers: this.headers,
        }
        return rp(options);
    }

    delete(id) {
        var options = {
            method: this.apis.deleteCheckout.method,
            uri: this.root_api + format(this.apis.deleteCheckout.url, {
                key: id
            }),
            json: true,
            headers: this.headers,
        }
        return rp(options);
    }
}
