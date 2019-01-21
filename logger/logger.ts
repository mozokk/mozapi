import eWinston from 'express-winston'
import winston = require('winston')

import { config } from '../exports'

class MLogger {
	_logger: any

	constructor() { }

	public log(message: any) {
		this._logger.info(message)
	}

	public error(message: any) {
		this._logger.error(message)
	}

	public static init(): MLogger {
		const self = new MLogger()

		self._logger = winston.createLogger({
			level: 'info',
			format: winston.format.json(),
			transports: MLogger.getTransports()
		})

		return self
	}

	public static getTransports() {
		return [
			new winston.transports.Console({
				format: winston.format.simple(),
				handleExceptions: true
			}),
			new winston.transports.File({ filename: 'error.log', level: 'error' }),
			new winston.transports.File({ filename: 'combined.log' })
		]
	}
}

export const logger: MLogger = MLogger.init()

export const getExpressLogger = () => {
    return eWinston.logger({
        transports: MLogger.getTransports(),
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}}",
        expressFormat: true,
        colorize: config.logger.colorize
    })
}

export const getExpressErrorLogger = () => {
    return eWinston.errorLogger({
        transports: MLogger.getTransports()
    })
}
