
const index = require('./routes/index');
const redis = require('./datasources').redis;
module.exports = (app) => {
    app.set('redis', redis);
    index(app);
}