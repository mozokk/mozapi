import express from 'express'
import fs from 'fs'
import path from 'path'
import csrf from 'csurf'
// import swaggerUi from 'swagger-ui-express';
// import specs from './specs';

import { RequestHandler } from 'express'
import { App, RouterOptions, RouteOptions } from '../exports'
import { Response } from '../utils'
import { config } from '../config'

export class Router {
	static init(app: App, options: RouterOptions) {
		const appMiddlewares: Array<RequestHandler> = app.options.middlewares || []
		const csrfProtection = csrf({ cookie: true })

		if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'storage'))) {
			fs.mkdirSync(path.join(__dirname, '..', '..', '..', 'storage'))
		}

		app.app.use('/storage', express.static(path.join(__dirname, '..', '..', '..', 'storage')))
		// app.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

		app.app.get(`/${options.base}/csrf`, csrfProtection, (req: any, res) => {
			const response = Response.init(res)
			return response.success(req.csrfToken())
		})

		for (const key in options.routes) {
			const route: RouteOptions = options.routes[key]

			if (route) {
				const middlewares = appMiddlewares.concat(route.middlewares || [])

				if (config.isCSRFProtected) {
					middlewares.push(csrfProtection)
				}

				app.app.use(`/${options.base}/${route.route}`, middlewares, route.router)
			}
		}
	}
}
