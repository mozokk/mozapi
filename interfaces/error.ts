export class UnauthorizedError extends Error {
    message = 'Unauthorized'

    constructor(message?: string) {
        super(message)
    }
}

export class ValidationError extends Error {
	errors

	constructor(errors) {
		super(errors.toString());

		this.errors = errors;
	}
}