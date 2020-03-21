import express from 'express'
import { Server } from 'http'

import { Express } from 'express'

import { App, AppOptions, Middleware, Storage, Router, config, logger } from './exports'

export class Application implements App {
	app: Express = express()
	server: Server = new Server()
	name: string = config.name
	storage: Storage
	options: AppOptions

	constructor(options: AppOptions) {
		this.storage = {
			database: undefined,
			type: undefined,
			close: () => {
				return
			},
		}

		this.options = options
	}

	public static init(options: AppOptions): App {
		logger.log(`Crafting ${this.name}...`)

		const app: App = new Application(options)

		Storage.init(app, options.storage)
		Middleware.init(app)
		Router.init(app, options.router)

		logger.log(`Enjoy!`)

		return app
	}

	public start() {
		if (config.runtype === 'express') {
			this.server = this.app.listen(config.port, this._onListening.bind(this))
		} else {
			throw new Error('Unsupported runtype. Only "express" is allowed.')
		}
	}

	public async startAsync(): Promise<string> {
		return new Promise((resolve, reject) => {
			if (config.runtype === 'express') {
				this.server = this.app.listen(config.port, () => {
					logger.log(`Listening on :${config.port}`)
					return resolve('Success')
				})
			} else {
				return reject('Invalid runtype')
			}
		})
	}

	public close(): void {
		this.storage.close()

		if (this.server) {
			this.server.close()
		}
	}

	private _onListening(): void {
		logger.log(`Listening on :${config.port}`)
	}
}
