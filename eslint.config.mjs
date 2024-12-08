import config from '@hugomods/eslint-config';
import tseslint from 'typescript-eslint';

export default tseslint.config(config, {
  ignores: ['jest.config.js'],
});
