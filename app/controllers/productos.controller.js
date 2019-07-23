const { ProductosService } = require('../services/productos.service');
const { RestUtils } = require('../utils/rest.utils');

class ProductosController {
  constructor() {

  }
  static async getProductos(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
      // Instanciamos redis
      const redis = req.app.get('redis');
      const sku = req.params.sku;
      let productData = null;

      productData = await RestUtils.checkRedis(redis, sku);
      
      if (productData == null) {
        console.log("Buscamos en el servicio");
        productData = await ProductosService.findByPartId(sku);

        if (!productData) {
          throw 404;
        }

        RestUtils.putRedis(redis,sku,productData);

      } 
      return res.json(RestUtils.createResponse(productData, 200));
    } catch (e) {
      return res.json(RestUtils.createResponse(null, e));
    }

    

  };
}

module.exports = {
  ProductosController
}
