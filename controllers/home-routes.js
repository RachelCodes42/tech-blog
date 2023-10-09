const router = require('express').Router();
const { Blog, User } = require('../models');

// get all blogs //
router.get('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    try {
      const blogData = await Blog.findAll({
        include: {
          model: User, attributes: { exclude: ["password"] }
        }
      });

      const blogs = blogData.map((blog) =>
        blog.get({ plain: true })
      );
      res.render('homepage', { blogs });

    } catch (err) {
      res.status(500).json(err);
    };
  }
});

// rendering login page //
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;