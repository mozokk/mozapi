import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'

import { RequestHandler } from 'express'

import { App, getExpressLogger, getExpressErrorLogger, config } from '../exports'

const MongoStore = connectMongo(session)

export class Middleware {
	public static init(app: App) {
		app.app.use(Middleware.getOrigin)
		app.app.use(Middleware.getCore())

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

		const policy: string = "default-src 'self' " + req.headers.origin
		res.setHeader('X-Content-Security-Policy', policy)
		res.setHeader('X-WebKit-CSP', policy)

		res.setHeader('X-Frame-Options', 'sameorigin')

		return next()
	}

	public static getCore(): Array<RequestHandler> {
		return [
			helmet(),
			getExpressLogger(),
			getExpressErrorLogger(),
			bodyParser.json({ limit: '20mb' }),
			bodyParser.urlencoded({ extended: true }),
			cookieParser(process.env.SECRET),
			passport.initialize(),
			passport.session(),
			compression(),
		]
	}

	public static getSession(): RequestHandler {
		return session({
			secret: process.env.SECRET,
			store: new MongoStore({
				mongooseConnection: mongoose.connection,
			}),
			saveUninitialized: false,
			resave: false,
			cookie: {
				secure: process.env.NODE_ENV === 'production',
				maxAge: null,
				httpOnly: true,
			},
		})
	}
}
