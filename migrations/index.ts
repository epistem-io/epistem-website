import * as migration_20260605_075040 from './20260605_075040';
import * as migration_20260623_104406 from './20260623_104406';

export const migrations = [
  {
    up: migration_20260605_075040.up,
    down: migration_20260605_075040.down,
    name: '20260605_075040',
  },
  {
    up: migration_20260623_104406.up,
    down: migration_20260623_104406.down,
    name: '20260623_104406'
  },
];
