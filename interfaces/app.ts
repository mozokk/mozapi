import { Server } from 'http'
import { RequestHandler, Express, Router as ExpressRouter } from 'express'
import { Storage } from '../exports'

export interface StorageOptions {
	type: string
}

export interface RouterOptions {
	routes: Array<RouteOptions>
	base: string
}

export interface RouteOptions {
	route: string
	router: ExpressRouter
	middlewares?: Array<RequestHandler>
}

export interface AppOptions {
	storage: StorageOptions
	router: RouterOptions
	needsAuth?: boolean
	middlewares?: Array<RequestHandler>
}

export interface App {
	app: Express
	name: string
	storage: Storage
	options: AppOptions
	server: Server
	start?: Function
	address?: any
}
