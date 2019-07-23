const product = require('./productos.route');
module.exports = (app) => {
  product(app);
}
