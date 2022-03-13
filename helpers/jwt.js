'use strict';

const jwt = require('jsonwebtoken');

const { SECRET_JWT } = process.env

function generateToken() {
	const token = jwt.sign(
		{
			exp: Math.floor(Date.now() / 100000) + 5000 * 6000,
		},
		SECRET_JWT
	);

	return token;
}

function validate(token, cb) {
	try {
		const decoded = jwt.verify(token, SECRET_JWT);
		if (decoded) {
			return cb(true, null);
		}

		return cb(false, null);
	} catch (err) {
		return cb(false, err);
	}
}

module.exports = { generateToken, validate };