const axios = require('axios');
const { logger } = require('../logger');

class RestUtils {

    constructor() {

    }

    static async checkRedis(redis, sku) {
        console.log("buscamos en redis");
        let productData = null;
        let checkRedis = false;

        if (redis) {
            checkRedis = await redis.getAsync(sku);
        }

        if (checkRedis) {
            productData = JSON.parse(checkRedis.toString());
            productData.cache = true;
            logger.info(`${sku} carga en redis`);
        }
        console.log("productData::" + productData);
        return productData;

    }

    static async putRedis(redis, sku, productData) {
        redis.set(sku, JSON.stringify(productData), 'EX', 60);
        logger.info(`products ${sku} load from url`);
    }



    static createResponse(data, code) {
        let message = (code != 200) ? 'error' : 'success';

        return {
            body: data,
            status: {
                message: message,
                code: code
            }
        }
    }


    static async callUrl(urlProduct) {
        try {
            response = await axios.get(urlProduct);
            responseData = response.data;
        } catch (err) {
            responseData = null;
        } finally {
            return responseData;
        }
    }

    static errorForzado() {
        // Random para error del 10%
        let random = Math.random();
        if (random < 0.11) {
            logger.error('error 10%');
            throw new Error();
        }
    }



}



module.exports = {
    RestUtils
}