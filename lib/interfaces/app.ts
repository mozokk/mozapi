import { Server } from 'http'
import { IMySQLConfig } from '.'
import { RequestHandler, Express, Router } from 'express'

export interface IRouterOptions {
    path: string
    middlewares?: Array<RequestHandler>
}

export interface IAppConfig {
    mysql: IMySQLConfig
}

export interface IAppOptions {
    router?: IRouterOptions
    needsAuth?: boolean
    middlewares?: Array<RequestHandler>
    config?: IAppConfig
}

export interface IApp {
    app: Express
    name: string
    router: Router
    options: IAppOptions
    server: Server
    start?: Function
    address?: any
}
