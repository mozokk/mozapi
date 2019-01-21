import express from 'express'
import { Server } from 'http'

import {
	Express
} from 'express'

import {
    IApp,
	IAppOptions,
	Middleware,
	Storage,
	Router,
    config,
	logger,
} from './exports'

export class App implements IApp {
    app: Express = express()
	server: Server = new Server()
	name: string = config.name
	storage: Storage
    options: IAppOptions

    constructor(options: IAppOptions) {
		this.storage = { database: undefined }
        this.options = options
    }

    public static init(options: IAppOptions): App {
		logger.log(`Crafting ${this.name}...`)

		const app: App = new App(options)

		Storage.init(app, options.storage)
		Middleware.init(app, app.storage)
		Router.init(app, options.router)

		logger.log(`Enjoy!`)

        return app
	}

    public start(): Object {
        let handler = new Object()

        if (config.runtype === 'express') {
            this.server = this.app.listen(config.port, this._onListening.bind(this))
        } else if (config.runtype === 'serverless') {
            handler = require('serverless-http')(this.app)
        }

        return handler
	}

	private _onListening() {
		logger.log(`Listening on :${config.port}`)
	}
}
