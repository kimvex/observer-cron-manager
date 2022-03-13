'use strict';

const jwt = require('jsonwebtoken');

const { SECRET_JWT } = process.env;

const generateToken = (user_id) => {
	const token = jwt.sign(
		{
			user_id,
		},
		SECRET_JWT,
		{ expiresIn: '48h' }
	);

	return token;
};

function validate(token, cb) {
	try {
		const decoded = jwt.verify(token, SECRET_JWT);
		if (decoded) {
			return cb(decoded, null);
		}

		return cb(null, null);
	} catch (err) {
		return cb(null, err);
	}
}

module.exports = {
	generateToken,
	validate,
};
