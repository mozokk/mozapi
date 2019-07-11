import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'
import path from 'path'

import { RequestHandler } from 'express'

import {
	IApp,
	getExpressLogger,
	getExpressErrorLogger,
	config,
	Storage
} from '../exports'

// const MongoStore = require('connect-mongo')(session)

export class Middleware {
	public static init(app: IApp, storage: Storage) {
		app.app.use(Middleware.getOrigin)
		app.app.use(Middleware.getCore(storage))

		app.app.use('/storage', express.static(path.join(__dirname, '..', '..', 'storage')))

		if (config.stage == 'development') {
			app.app.use(morgan('dev'))
		}

		app.app.disable('x-powered-by')
	}

	public static getOrigin(req, res, next): RequestHandler {
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Token, X-Requested-With, x-csrf-token, x-access-token')
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
		res.setHeader('Access-Control-Allow-Credentials', 'true')

		let policy: string = "default-src 'self' " + req.headers.origin
        res.setHeader('X-Content-Security-Policy', policy)
        res.setHeader('X-WebKit-CSP', policy)

		res.setHeader('X-Frame-Options', 'sameorigin')

		return next()
	}

	public static getCore(_storage: Storage): Array<RequestHandler> {
		return [
			helmet(),
			getExpressLogger(),
			getExpressErrorLogger(),
			cors(),
			bodyParser.json({ limit: '20mb' }),
			bodyParser.urlencoded({ extended: true }),
			cookieParser(process.env.SECRET),
			session({
				secret: process.env.SECRET,
				saveUninitialized: false,
				resave: false,
				// store: new MongoStore({ mongooseConnection: storage.database ? storage.database.connection : null }),
				cookie: {
					httpOnly: true,
					secure: config.stage == 'production'
				}
			}),
			passport.initialize(),
			passport.session(),
			compression()
		]
	}
}
