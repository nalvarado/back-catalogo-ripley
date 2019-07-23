
const { ProductosController } = require('../controllers/productos.controller');
module.exports = (app) => {
  app.get('/obtiene/producto/:sku' , ProductosController.getProductos);
};
