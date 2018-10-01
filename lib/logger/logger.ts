import * as eWinston from 'express-winston'

import { config } from '../exports'

export const winston = require('winston')

const winstonConsole = new winston.transports.Console(config.logger)

winston.level = config.logger.level

winston.configure({
  	transports: [winstonConsole]
})

export const getExpressLogger = () => {
    return eWinston.logger({
        transports: [winstonConsole],
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}}",
        expressFormat: true,
        colorize: config.logger.colorize
    })
}

export const getExpressErrorLogger = () => {
    return eWinston.errorLogger({
        transports: [winstonConsole]
    })
}
