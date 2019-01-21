export class UnauthorizedError extends Error {
    message = 'Unauthorized'

    constructor(message?: string) {
        super(message)
    }
}
