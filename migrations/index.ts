import * as migration_20260605_075040 from './20260605_075040';

export const migrations = [
  {
    up: migration_20260605_075040.up,
    down: migration_20260605_075040.down,
    name: '20260605_075040'
  },
];
