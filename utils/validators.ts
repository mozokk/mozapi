import { validationResult } from 'express-validator'
import { Response } from './response'

export const isEmailValid = (email: string) => {
	return email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? true : false
}

export const isWebsiteValid = (website: string) => {
	return website.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm) ? true : false
}

export const isUuidValid = (uuid: string) => {
	return uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i) ? true : false
}

export const errorsPrettify = errors => errors.map(error => error.msg);

export const validationHandler = (req, res, next) => {
	const response = Response.init(res)
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		const errorsPrettified = errorsPrettify(errors.array())
		return response.failureWithJSON(errorsPrettified, 422)
	}

	return next()
}
