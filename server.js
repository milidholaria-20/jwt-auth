const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = '10m';

if (!JWT_SECRET) {
  console.error('ERROR: JWT_SECRET is not set in .env');
  process.exit(1);
}

const users = [];

function findUser(email) {
  return users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
}

app.get('/register', async (req, res) => {
  const { email, password } = req.query;
  if (!email || !password) {
    return res.status(400).send('Missing email or password');
  }

  if (findUser(email)) {
    return res.status(400).send('Email already registered');
  }

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    users.push({ email, passwordHash: hash });
    return res.send('Registration successful');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

app.get('/login', async (req, res) => {
  const { email, password } = req.query;
  if (!email || !password) {
    return res.status(400).send('Missing email or password');
  }

  const user = findUser(email);
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  try {
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).send('Invalid credentials');

    const payload = { email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    return res.send(token);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

app.get('/invoke', (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(401).send('Access denied');
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Access denied');
    }
    return res.send('Function invoked successfully');
  });
});

app.get('/', (req, res) => {
  res.send('JWT Auth assignment server. Use /register, /login, /invoke with query parameters.');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
