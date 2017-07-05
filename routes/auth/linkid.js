const express = require('express');
const router = express.Router();

const authModel = require('models/auth');

const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin');
const config = require('config');
const authmw = require('./authmw');

/**
 * Created by Avd on 10.04.2017.
 */

passport.use(new LinkedInStrategy({
	consumerKey: config.get('auth:linkedinAuth:clientID'),
	consumerSecret: config.get('auth:linkedinAuth:clientSecret'),
	callbackURL: config.get('rootURL') + ':' + config.get('callbackPort') + config.get('auth:linkedinAuth:callbackURL')
},
	function (token, tokenSecret, profile, done) {
		profile.username = profile.displayName;
		profile.token = token;
		authModel.findOrCreate(profile, token, (err,  user ) => {
			if (err) { return done(err, null) }
			return done(null, { user });
		});
	}
));

//Linkedin auth handler
router.get('/', passport.authenticate('linkedin'));

router.get('/callback', (req, res, next) => {
	passport.authenticate('linkedin', authmw(req, res, next))(req, res, next);
});


module.exports = router;