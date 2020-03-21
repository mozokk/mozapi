import express from 'express'
import fs from 'fs'
import path from 'path'
import csrf from 'csurf'

import { RequestHandler } from 'express'
import { App, RouterOptions, RouteOptions } from '../exports'
import { Response } from '../utils'
import { config } from '../config'
import { RequestInterface, ResponseInterface } from '../interfaces'

export class Router {
	static init(app: App, options: RouterOptions) {
		const appMiddlewares: Array<RequestHandler> = app.options.middlewares || []
		const csrfProtection = csrf({ cookie: true })

		if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'storage'))) {
			fs.mkdirSync(path.join(__dirname, '..', '..', '..', 'storage'))
		}

		app.app.use('/storage', express.static(path.join(__dirname, '..', '..', '..', 'storage')))

		if (config.isCSRFProtected) {
			app.app.get(`/${options.base}/csrf`, csrfProtection, (req: RequestInterface, res: ResponseInterface) => {
				const response = Response.init(res)
				return response.success(req.csrfToken())
			})
		}

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
