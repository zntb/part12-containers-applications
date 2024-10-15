const Blog = require("../models/blog");
const blogsRouter = require("express").Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", ["username", "name"]);

  response.json(
    blogs.map((blog) => ({
      url: blog.url,
      title: blog.title,
      author: blog.author,
      user: {
        username: blog.user.username,
        name: blog.user.name,
        id: blog.user._id,
      },
      likes: blog.likes,
      id: blog._id,
    })),
  );
});

blogsRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id).populate("user", ["username", "name"]);

  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  response.json({
    url: blog.url,
    title: blog.title,
    author: blog.author,
    user: {
      username: blog.user.username,
      name: blog.user.name,
      id: blog.user._id,
    },
    likes: blog.likes,
    id: blog._id,
  });
});

blogsRouter.post("/", async (request, response, next) => {
  const { title, url, likes } = request.body;
  const user = request.user;

  try {
    if (!user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    if (!title || !url) {
      return response.status(400).json({ error: "title or url missing" });
    }

    const blog = new Blog({
      title,
      author: user.username,
      url,
      likes: likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = request.user;

    if (!user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: "only the creator can delete this blog" });
    }

    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate("user", { username: 1, name: 1 });

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (deletedBlog) {
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(500).end();
  }
});

module.exports = blogsRouter;
