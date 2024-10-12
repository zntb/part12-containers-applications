const redis = require('../redis');
const { Todo } = require('../mongo');

const syncRedisWithMongo = async () => {
  try {
    const todoCount = await Todo.countDocuments();
    await redis.setAsync('added_todos', todoCount);
    console.log(`Redis initialized with count from MongoDB: ${todoCount}`);
  } catch (err) {
    console.error('Failed to sync Redis with MongoDB:', err);
  }
};

const incrementRedisCounter = async () => {
  try {
    await redis.incrAsync('added_todos');
    console.log('Redis counter incremented');
  } catch (err) {
    console.error('Failed to increment Redis counter:', err);
  }
};

const decrementRedisCounter = async () => {
  try {
    await redis.decrAsync('added_todos');
    console.log('Redis counter decremented');
  } catch (err) {
    console.error('Failed to decrement Redis counter:', err);
  }
};

module.exports = {
  syncRedisWithMongo,
  incrementRedisCounter,
  decrementRedisCounter,
};
