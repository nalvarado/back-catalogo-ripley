
const redis = require('redis');
const Promise = require('bluebird');
const client = Promise.promisifyAll(redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true}));
client.auth(process.env.REDISCLOUD_URL_PASS);

module.exports = {
  redis: client
};
