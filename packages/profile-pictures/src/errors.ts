export enum ResponseErrorCode {
  NETWORK = 'NETWORK',
  INVALID_JSON = 'INVALID_JSON',
  INVALID_API_RESPONSE = 'INVALID_API_RESPONSE',
  BAD_HTTP_CODE = 'BAD_HTTP_CODE',
}

/**
 * Represents an error that occurs during an API response.
 *
 * @extends Error
 * @property {ResponseErrorCode} code The error code (string).
 * @property {unknown} sourceError The original error that caused this error, if any.
 */
export class ApiResponseError extends Error {
  code: ResponseErrorCode;
  sourceError?: unknown;

  constructor(code: ResponseErrorCode, message: string, sourceError?: unknown) {
    super(message);
    this.code = code;
    this.sourceError = sourceError;
  }
}
