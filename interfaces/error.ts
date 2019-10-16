export class UnauthorizedError extends Error {
    message = 'Unauthorized'

    constructor(message: string) {
		super(message)
		this.message = message
    }
}

export class ValidationError extends Error {
	errors

	constructor(errors) {
		super(errors.toString());

		this.errors = errors;
	}
}

export class NotFoundError extends Error {
	message = 'Not Found'

    constructor(message: string) {
		super(message)
		this.message = message
    }
}

export class MongooseError extends Error {
	message = 'Duplicate entry'

    constructor(message: string) {
		super(message)
		this.message = message
    }
}
