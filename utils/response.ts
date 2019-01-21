
export class Response {
	res: any

	constructor(res: any) {
		this.res = res
	}

	static init(res: any) {
		return new Response(res)
	}

	public success(data?: any) {
		data = data || {}
		this.res.status(200).json(data)
	}

	public failure(message?: string, statusCode?: number) {
		message = message || 'Something unexpected happened'
		statusCode = statusCode || 500

		this.res.status(statusCode).send(message)
	}
}
