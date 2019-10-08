import { Response } from './response';
import {
	UnauthorizedError,
	ValidationError
} from '../interfaces';
import httpCodes from '../constants/http_codes';

export class Controller {
	protected async invoke(res, action) {
		const response = Response.init(res);

		try {
			const result = await action();

			return response.success(result);
		} catch (error) {
			console.log(error.message)
			if (error instanceof UnauthorizedError) {
				return response.failure(error.message, httpCodes.HTTP_UNAUTHORIZED);
			}

			if (error instanceof ValidationError) {
				return response.failureWithJSON(error.errors, httpCodes.HTTP_UNPROCESSSSABLE_ENTITY);
			}

			return response.failure();
		}
	}
}
