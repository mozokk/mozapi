import * as express from 'express'
import { Server } from 'http'

import {
	Express,
	Router as ExpressRouter
} from 'express'

import {
    IApp,
    IAppOptions,
	Middleware,
	Router,
    config,
    winston
} from '.'

export class App implements IApp {
    app: Express = express()
	server: Server = new Server()
	name: string = config.name
    router: ExpressRouter
    options: IAppOptions

    constructor(router: Router, options?: IAppOptions) {
        this.router = router
        this.options = options || {}
    }

    public static init(router: Router, options?: IAppOptions): App {
		winston.info(`Crafting ${this.name}...`)

		const app: App = new App(router, options)

		Middleware.init(app)
		Router.init(app)

		winston.info(`Enjoy!`)

        return app
	}

    public start(): Object {
        let handler = new Object()

        if (config.runtype === 'express') {
            this.server = this.app.listen(config.port, this._onListening)
        } else if (config.runtype === 'serverless') {
            handler = require('serverless-http')(this.app)
        }

        return handler
	}

	private _onListening() {
		winston.info('info', `Listening on :${config.port}`)
	}
}
