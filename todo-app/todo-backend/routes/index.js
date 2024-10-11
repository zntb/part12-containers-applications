const express = require('express');
const router = express.Router();
const redis = require('../redis');

const configs = require('../util/config');

let visits = 0;

router.get('/', async (req, res) => {
  let visits = await redis.getAsync('visits');
  visits = visits ? parseInt(visits) : 0;

  await redis.setAsync('visits', visits + 1);

  res.send({
    ...configs,
    visits: visits + 1,
  });
});

router.get('/redis', async (req, res) => {
  const value = await redis.getAsync('visits');
  res.send({
    visits: value ? parseInt(value) : 0,
  });
});

module.exports = router;
