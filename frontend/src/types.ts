export enum Env {
  inMemory = 'inMemory',
  devNet = 'devNet',
  testNet = 'testNet',
}

export type Config = {
  env: Env;
};
