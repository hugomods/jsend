type Data = unknown;

/**
 * Interface that represent a JSend response.
 *
 * @interface
 * @property {string} status - The response status: success, fail or error.
 * @property {unknown} [data] - The optional response data.
 * @property {number} [code] - The error code.
 * @property {string} [message] - The error message.
 */
interface JSend {
  status: string;
  data?: Data;
  code?: number;
  message?: string;
}

/**
 * Generate an error response.
 * @overload
 * @param {string} message - Error message.
 * @param {number} [code] - Error code.
 * @param {unknown} [data]
 * @returns {JSend}
 */
type ErrorFunc = {
  (message: string): JSend;
  (message: string, code: number): JSend;
  (message: string, code: number, data: Data): JSend;
  (message: string, code: number, data: Data, a: string): JSend;
};

export const error: ErrorFunc = (
  message: string,
  code?: number,
  data?: Data,
): JSend => {
  const body: JSend = {
    status: 'error',
    message,
  };

  if (code !== undefined) {
    body.code = code;
  }
  if (data !== undefined) {
    body.data = data;
  }

  return body;
};

/**
 * Generate a fail response.
 * @param {unknown} [data]
 * @returns {JSend}
 */
export const fail = (data?: Data): JSend => {
  return {
    status: 'fail',
    data: data ?? null,
  };
};

/**
 * Generate a success response.
 * @param {unknown} [data]
 * @returns {JSend}
 */
export const success = (data?: Data): JSend => {
  return {
    status: 'success',
    data: data ?? null,
  };
};

/** Success response that without data. */
export const SUCCESS: JSend = success();
