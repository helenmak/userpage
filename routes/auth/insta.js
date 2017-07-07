const express = require('express');
const router = express.Router();

const authModel = require('models/auth');

const passport = require('passport');
const InstagramStrategy = require('passport-instagram');
const config = require('config');
const authmw = require('./authmw');

passport.use(new InstagramStrategy(
	{
		clientID: config.get('auth:insta:clientID'),
		clientSecret: config.get('auth:insta:clientSecret'),
		callbackURL: config.get('rootURL') + ':' + config.get('callbackPort') + config.get('auth:insta:callbackPath')
	},

	function (accessToken, refreshToken, profile, done) {
		profile.username = profile.displayName;
		profile.token = accessToken;
		console.log(profile);
		authModel.findOrCreate(profile, accessToken, (err, data) => {
			if (err) { return done(err, null) }
			return done(null, data.user);
		});
	}
));

//Instagram auth handler
router.get('/', passport.authenticate('instagram'));

router.get('/callback', (req, res, next) => {
	passport.authenticate('instagram', authmw(req, res, next))(req, res, next);
});


module.exports = router;
