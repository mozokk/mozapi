import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import { RequestHandler } from 'express'

import {
	IApp,
	getExpressLogger,
	getExpressErrorLogger
} from '..'

export class Middleware {
	public static init(app: IApp) {
		app.app.use(Middleware.getOrigin)
        app.app.use(Middleware.getCore())
	}

	public static getOrigin(_req, res, next): RequestHandler {
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Token')
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')

		next()
	}

	public static getCore(): Array<RequestHandler> {
		return [
			getExpressLogger(),
			getExpressErrorLogger(),
			cors(),
			bodyParser.json({ limit: '20mb' }),
			bodyParser.urlencoded({ extended: true }),
			compression()
		]
	}
}
