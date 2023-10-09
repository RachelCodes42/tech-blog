const router = require('express').Router();
const { Blog, User } = require('../../models');

// creating new blog post //
router.post('/', async (req, res) => {
  try {
    const blogData = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    });

    res.status(200).json(blogData);

  } catch (err) {
    res.status(500).json(err);
  };
});

// getting one blog by id // 
router.get('/:id', async (req, res) => {
  try {
    const oneBlog = await Blog.findByPk(req.params.id, {
      include: {
        model: User, attributes: { exclude: ["password"] }
      }
    });

    const blog = oneBlog.get({ plain: true });
    res.render('selected-blog', { blog });

  } catch (err) {
    res.status(500).json(err);
  }
});

// getting one blog by id TO EDIT // 
router.get('/edit/:id', async (req, res) => {
  try {
    const oneBlog = await Blog.findByPk(req.params.id, {
      include: {
        model: User, attributes: { exclude: ["password"] }
      }
    });

    const blog = oneBlog.get({ plain: true });
    res.render('edit-blog', { blog });

  } catch (err) {
    res.status(500).json(err);
  }
});

// submitting updated blog by id //
router.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// deleting blog by id //
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;