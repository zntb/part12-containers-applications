const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const redis = require('../redis');
const { incrementRedisCounter, decrementRedisCounter } = require('../util');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  try {
    if (!redis.incrAsync) {
      console.error('Redis is not connected');
      return res.status(500).send({ error: 'Redis is not connected' });
    }

    await incrementRedisCounter();

    const todo = await Todo.create({
      text: req.body.text,
      done: false,
    });

    res.send(todo);
  } catch (err) {
    console.error('Error during POST /todos:', err);
    res.status(500).send({ error: 'Failed to add todo' });
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;

  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).send({ error: 'Todo not found' });
    }

    await todo.remove();
    await decrementRedisCounter();

    res.sendStatus(200);
  } catch (err) {
    console.error('Error during DELETE /todos:', err);
    res.status(500).send({ error: 'Failed to delete todo' });
  }
});

/* PUT todo by ID. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;

  req.todo.text = text !== undefined ? text : req.todo.text;
  req.todo.done = done !== undefined ? done : req.todo.done;

  const updatedTodo = await req.todo.save();
  res.json(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
