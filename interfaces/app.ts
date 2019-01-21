import { Server } from 'http'
import { RequestHandler, Express, Router as ExpressRouter } from 'express'
import { Storage } from '../exports'

export interface IStorageOptions {
	type: string
}

export interface IRouterOptions {
	routes: Array<IRouteOptions>
    base: string
}

export interface IRouteOptions {
	route: string
	router: ExpressRouter
	middlewares?: Array<RequestHandler>
}

export interface IAppOptions {
	storage: IStorageOptions
    router: IRouterOptions
    needsAuth?: boolean
    middlewares?: Array<RequestHandler>
}

export interface IApp {
    app: Express
	name: string
	storage: Storage
    options: IAppOptions
    server: Server
    start?: Function
    address?: any
}
