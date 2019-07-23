const axios = require('axios');
const ripleyUrl = "https://simple.ripley.cl/api/v2/products/"
const { RestUtils } = require('../utils/rest.utils');

class ProductosService {
  static async findByPartId(id) {
    const urlProduct = ripleyUrl + id;
    try {
      RestUtils.errorForzado();

      // Si no tiene error forzado se llama la url con axios
      const productData =  await callUrl(urlProduct);
      return productData;
    }
    catch (err) {
      return await this.findByPartId(id);
    }
  };
}

async function callUrl (urlProduct) {
  try {
    response = await axios.get(urlProduct);
    responseData = response.data;
  } catch (err) {
    responseData = null;
  } finally {
    return responseData;
  }
}

module.exports = {
  ProductosService
}