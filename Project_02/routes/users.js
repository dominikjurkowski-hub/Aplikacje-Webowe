const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
		return resres.send('Email already exists');
    }

    const user = await User.create({ email, password });
		res.json({ userId: user.id });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
		return resres.send('Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
});




module.exports = router;
