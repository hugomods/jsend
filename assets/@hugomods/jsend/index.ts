type Data = unknown;

interface JSend {
  status: string;
  data?: Data;
  code?: number;
  message?: string;
}

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

export const fail = (data?: Data): JSend => {
  return {
    status: 'fail',
    data: data ?? null,
  };
};

export const success = (data?: Data): JSend => {
  return {
    status: 'success',
    data: data ?? null,
  };
};
