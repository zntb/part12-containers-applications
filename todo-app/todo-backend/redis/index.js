const redis = require('redis');
const { REDIS_URL } = require('../util/config');

let getAsync, setAsync, incrAsync, decrAsync;

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled');
    return null;
  };
  getAsync = redisIsDisabled;
  setAsync = redisIsDisabled;
  incrAsync = redisIsDisabled;
  decrAsync = redisIsDisabled;
} else {
  const client = redis.createClient({
    url: REDIS_URL,
  });

  client.on('connect', () => {
    console.log('Connected to Redis');
  });

  client.on('error', err => {
    console.error('Redis connection error:', err);
  });

  (async () => {
    try {
      await client.connect();
    } catch (err) {
      console.error('Error connecting to Redis:', err);
    }
  })();

  getAsync = async key => await client.get(key);
  setAsync = async (key, value) => await client.set(key, value);
  incrAsync = async key => await client.incr(key);
  decrAsync = async key => await client.decr(key);
}

module.exports = {
  getAsync,
  setAsync,
  incrAsync,
  decrAsync,
};
