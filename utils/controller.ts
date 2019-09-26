import { Response } from './response';
import {
	UnauthorizedError,
	ValidationError
} from '../interfaces';

export class Controller {
	protected async invoke(res, action) {
		const response = Response.init(res);

		try {
			const result = await action();

			return response.success(result);
		} catch (error) {
			console.log(error.message)
			if (error instanceof UnauthorizedError) {
				return response.failure(error.message, 401);
			}

			if (error instanceof ValidationError) {
				return response.failureWithJSON(error.errors, 422);
			}

			return response.failure();
		}
	}
}
