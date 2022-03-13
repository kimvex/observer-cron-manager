'use strict';

const { validate } = require('../helpers/jwt');

function validateSession(sol, res, next) {
	const {
		headers: { token },
	} = sol;

	validate(token, (valid, error) => {
		if (error) {
			return res.status(401).json({
				message: 'invalid token',
			});
		}

		if (valid) {
			return next();
		}

		return res.status(401).json({
			message: 'invalid token',
		});
	});
}

module.exports = validateSession;