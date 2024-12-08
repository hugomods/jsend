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
};
export declare const error: ErrorFunc;
export declare const fail: (data?: Data) => JSend;
export declare const success: (data?: Data) => JSend;
export {};
