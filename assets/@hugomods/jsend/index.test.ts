import { expect, test } from '@jest/globals';
import { error, fail, success } from './index';

test('fail without data', () => {
  const rst = fail();
  expect(rst.status).toBe('fail');
  expect(rst.data).toBeNull();
});

test('fail with data', () => {
  const data = {
    fields: {
      title: 'The title is required.',
    },
  };
  const rst = fail(data);
  expect(rst.status).toBe('fail');
  expect(rst.data).toStrictEqual(data);
});

test('error with message', () => {
  const message = 'ERROR';
  const rst = error(message);
  expect(rst.status).toBe('error');
  expect(rst.message).toStrictEqual(message);
});

test('error with message and code', () => {
  const message = 'ERROR';
  const code = 10000;
  const rst = error(message, code);
  expect(rst.status).toBe('error');
  expect(rst.message).toStrictEqual(message);
  expect(rst.code).toStrictEqual(code);
});

test('error with message, code and data', () => {
  const message = 'ERROR';
  const code = 10000;
  const data = {
    debug: [
      {
        error: 'Unable to communicate with database',
        file: '/home/foo/bar/app.js',
        line: 8,
      },
    ],
  };
  const rst = error(message, code, data);
  expect(rst.status).toBe('error');
  expect(rst.message).toStrictEqual(message);
  expect(rst.code).toStrictEqual(code);
});

test('success without data', () => {
  const rst = success();
  expect(rst.status).toBe('success');
  expect(rst.data).toBeNull();
});

test('success with data', () => {
  const data = {
    items: [
      {
        title: 'Foo',
      },
      {
        title: 'Bar',
      },
    ],
    page: 1,
  };
  const rst = success(data);
  expect(rst.status).toBe('success');
  expect(rst.data).toStrictEqual(data);
});
