export default {
	/* Informational */
	HTTP_PROCESSSING: 102,

	/* Success */
	HTTP_OK: 200,
	HTTP_CREATED: 201,
	HTTP_ACCEPTED: 202,
	HTTP_NO_CONTENT: 204,

	/* Redirection */
	HTTP_MOVED_PERMANENTLY: 301,
	HTTP_FOUND: 302,
	HTTP_NOT_MODIFIED: 304,

	/* Client Error */
	HTTP_BAD_REQUEST: 400,
	HTTP_UNAUTHORIZED: 401,
	HTTP_FORBIDDEN: 403,
	HTTP_NOT_FOUND: 404,
	HTTP_REQUEST_TIMEOUT: 408,
	HTTP_CONFLICT: 409,
	HTTP_UNPROCESSSSABLE_ENTITY: 422,

	/* Server Error */
	HTTP_INTERNAL_SERVER_ERROR: 500,
	HTTP_BAD_GATEWAY: 502,
	HTTP_SERVICE_UNAVAILABLE: 503,
	HTTP_GATEWAY_TIMEOUT: 504,
}