import { validationResult } from 'express-validator'
import { Response } from './response'

export const errorsPrettify = errors => errors.map(error => error.msg)

export const validationHandler = (req, res, next) => {
	const response = Response.init(res)
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		const errorsPrettified = errorsPrettify(errors.array())
		return response.failureWithJSON(errorsPrettified, 422)
	}

	return next()
}
