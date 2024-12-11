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

type ErrorFunc = {
  /**
   * Generate an error response with message.
   * @overload
   * @param {string} message - Error message.
   * @returns {JSend}
   */
  (message: string): JSend;

  /**
   * Generate an error response with message and code.
   * @overload
   * @param {string} message - Error message.
   * @param {number} code - Error code.
   * @returns {JSend}
   */
  (message: string, code: number): JSend;

  /**
   * Generate an error response with message, code and data.
   * @overload
   * @param {string} message - Error message.
   * @param {number} code - Error code.
   * @param {unknown} data
   * @returns {JSend}
   */
  (message: string, code: number, data: Data): JSend;
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
