import { ServerResponse, IncomingMessage } from 'http'
import { Connection } from 'promise-mysql'

export interface ResponseInterface extends ServerResponse {
	render: Function
	status: Function
	hal: Function
	locals: Function
	json: Function
	send: Function
}

export interface RequestInterface extends IncomingMessage {
	baseUrl?: string
	params: object
	body: object
	query: object
	file: object
	csrfToken: Function
}

export interface ResponseOptions {
	statusCode?: number
	contentType?: string
	customData?: any
}

export interface AuthHandler {
	data?: any
	options?: any
	handler(res: Response, connection?: Connection): Promise<any>
}

export * from 'http'
