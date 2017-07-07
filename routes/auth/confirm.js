
const express = require('express');
const router = express.Router();
const authModel = require('models/auth');

router.all('/:secret', (req, res) => {
	if (req.params && req.params.secret) {
		authModel.confirmAccount(req.params.secret);
	}
	res.redirect('/');
})

module.exports = router;