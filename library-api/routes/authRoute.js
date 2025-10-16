const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// --- Configure Passport GitHub Strategy ---
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/api/auth/github/callback",
},
async function(accessToken, refreshToken, profile, done) {
  try {
    // Find or create user
    let user = await User.findOne({ githubId: profile.id });
    if (!user) {
      // Create new user with GitHub profile info
      user = new User({
        username: profile.username || profile.displayName,
        email: profile.emails && profile.emails[0] ? profile.emails[0].value : undefined,
        githubId: profile.id,
      });
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// REGISTER

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - email
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// LOGIN

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user and get JWT token
 *     tags: [Auth]
 *     parameters:
 *       - in: body
 *         name: credentials
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: JWT token returned
 *       401:
 *         description: Invalid credentials
 */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password }); // debugging 

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('No user found with email:', email);  // debugging
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('User found:', user.email); // debugging

    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch); // debugging 

    if (!isMatch) {
      console.log('Password mismatch for:', email); // debugging 
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generated:', token);  // debugging

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err); // Log full error - debugging
    res.status(500).json({ error: 'Server error' });
  }
});

// LOGOUT (Handled client-side by deleting token)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully (just remove token client-side)' });
});

/**
 * @swagger
 * /auth/github:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Redirect user to GitHub for OAuth login
 *     responses:
 *       302:
 *         description: Redirects to GitHub OAuth page
 */

// 1. Route to start GitHub OAuth login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     tags:
 *       - Auth
 *     summary: GitHub OAuth callback URL
 *     parameters:
 *       - name: code
 *         in: query
 *         description: GitHub OAuth authorization code
 *         required: true
 *         type: string
 *     responses:
 *       302:
 *         description: Redirects to frontend with JWT token
 *       401:
 *         description: Authentication failed
 */

// 2. GitHub OAuth callback route
router.get('/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, issue JWT token:
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    // Send token in response (or redirect with token in query)
    // For example, redirect to frontend with token in query param:
    res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
  }
);


module.exports = router;