const router = require('express').Router();
const { User, Blog } = require('../../models');

// creating a new user //
router.post('/', async (req, res) => {
  console.log("This is the user",req.body)
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    if (userData.username.includes(' ')) {
      res.json({ message: 'No spaces allowed in Username.' });
      return;
    } 
    // else {
      res.status(200).json(userData);
    // }

  } catch (err) {
    res.status(500).json(err);
  }
});

// getting one user by id //
router.get('/:id', async (req, res) => {
  try {
    const oneUser = await User.findByPk(req.params.id, {
      include: {
        model: Blog
      }
    });

    oneUser.password = undefined;

    const user = oneUser.get({ plain: true });
    res.render('dashboard', { user })
    console.log(user);

  } catch (err) {
    res.status(500).json(err);
  }
});

// login //
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, try again.' });
        return;
    }

    const validPassword = await userData.verifyPassword(req.body.password);

    if (!validPassword) {
      res 
        .status(400)
        .json({ message: 'Incorrect username of password, try again.' });
        return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are logged in.' });
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;