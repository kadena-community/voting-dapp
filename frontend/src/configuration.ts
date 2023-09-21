import { Env, Config } from './types';

const defaultEnv: Env = Env.devNet;

const BUILD_ENVIRONMENT: Env = import.meta.env.VITE_APP_BUILD_ENVIRONMENT || defaultEnv;

export const config: Config = {
  env: BUILD_ENVIRONMENT,
};
