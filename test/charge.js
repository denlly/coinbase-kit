module.exports = class Charge {
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
