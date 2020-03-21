import { ServerResponse, IncomingMessage } from 'http'

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

export * from 'http'
