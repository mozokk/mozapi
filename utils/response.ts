export class Response {
	res: any

	constructor(res: any) {
		this.res = res
	}

	static init(res: any) {
		return new Response(res)
	}

	public success(data?: any, statusCode?: number) {
		data = data || {}
		statusCode = statusCode || 200

		this.res.status(statusCode).json(data)
	}

	public failure(message?: string, statusCode?: number) {
		message = message || 'Something unexpected happened'
		statusCode = statusCode || 500

		this.res.status(statusCode).end(message)
	}

	failureWithJSON(data, statusCode) {
		data = data || {}
		statusCode = statusCode || 500

		this.res
			.status(statusCode)
			.json(data)
			.end()
	}
}
