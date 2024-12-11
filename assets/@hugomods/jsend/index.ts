type Data = unknown;

export const STATUS_ERROR = 'error';
export const STATUS_FAIL = 'fail';
export const STATUS_SUCCESS = 'success';

/**
 * Interface that represents a JSend response.
 *
 * @property {string} status - The response status: success, fail or error.
 * @property {Data} [data] - The optional response data.
 * @property {number} [code] - The error code.
 * @property {string} [message] - The error message.
 */
interface JSendResponse {
  status: string;
  data?: Data;
  code?: number;
  message?: string;
}

export default class JSend {
  /**
   * @see {@link JSendResponse.code}
   */
  public code?: number;

  /**
   * @see {@link JSendResponse.data}
   */
  public data?: Data;

  /**
   * @see {@link JSendResponse.message}
   */
  public message?: string;

  constructor(public status: string) {}

  /**
   * Set error code
   * @param {number} code
   * @returns {JSend}
   */
  setCode(code: number): this {
    this.code = code;
    return this;
  }

  /**
   * Set data.
   * @param {Data} data
   * @returns JSend
   */
  setData(data: Data): this {
    this.data = data;
    return this;
  }

  /**
   * Set error message.
   * @param {string} message
   * @returns {JSend}
   */
  setMessage(message: string): this {
    this.message = message;
    return this;
  }

  setStatus(status: string): this {
    this.status = status;
    return this;
  }

  toJSON(): JSendResponse {
    const res: JSendResponse = {
      status: this.status,
    };

    if (this.data !== undefined) {
      res.data = this.data;
    } else if (this.status !== STATUS_ERROR) {
      // always returns the data field for fail and success responses.
      res.data = null;
    }

    if (this.status === STATUS_ERROR) {
      if (this.code !== undefined) {
        res.code = this.code;
      }
      if (this.message !== undefined) {
        res.message = this.message;
      }
    }

    return res;
  }

  /**
   * Generate an error response with message.
   * @overload
   * @param {string} message - Error message.
   * @returns {JSend}
   */
  static error(message: string): JSend;
  /**
   * Generate an error response with message and code.
   * @overload
   * @param {string} message - Error message.
   * @param {number} code - Error code.
   * @returns {JSend}
   */
  static error(message: string, code: number): JSend;
  /**
   * Generate an error response with message, code and data.
   * @overload
   * @param {string} message - Error message.
   * @param {number} code - Error code.
   * @param {Data} data
   * @returns {JSend}
   */
  static error(message: string, code: number, data: Data): JSend;
  static error(message: string, code?: number, data?: Data): JSend {
    const res = new JSend(STATUS_ERROR).setMessage(message);
    if (code !== undefined) {
      res.setCode(code);
    }
    if (data !== undefined) {
      res.setData(data);
    }
    return res;
  }

  /**
   * Generate a fail response.
   * @param {Data} [data]
   * @returns {JSend}
   */
  static fail(data?: Data): JSend {
    const res = new JSend(STATUS_FAIL);
    if (data) {
      res.setData(data);
    }
    return res;
  }

  /**
   * Generate a success response.
   * @param {Data} [data]
   * @returns {JSend}
   */
  static success(data?: Data): JSend {
    const res = new JSend(STATUS_SUCCESS);
    if (data) {
      res.setData(data);
    }
    return res;
  }
}

/** Success response that without data. */
export const SUCCESS: JSendResponse = JSend.success();
