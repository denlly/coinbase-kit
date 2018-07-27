module.exports = class ClientBase {
    constructor({
        headers,
        root_api,
        secret_key,
    }) {
        this.headers = headers;
        this.root_api = root_api;
        this.secret_key = secret_key;
    }
}
