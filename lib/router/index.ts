import { RequestHandler } from 'express'
import { IApp } from '../exports'

export class Router {
	static init(app: IApp) {
		const middlewares: Array<RequestHandler> = app.options.middlewares || new Array()
		app.app.use(`/${this.name}`, middlewares, app.router)
	}
}
