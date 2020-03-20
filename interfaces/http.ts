import { ServerResponse, IncomingMessage } from 'http'
import { Connection } from 'promise-mysql'

export interface Response extends ServerResponse {
	render?: any
	status?: any
	hal?: any
	locals?: any
	json?: any
	send?: any
}

export interface Request extends IncomingMessage {
	baseUrl?: string
	params?: any
	body?: any
	query?: any
	file?: any
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
