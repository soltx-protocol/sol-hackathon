import PoolConfig from './configs.json';

export const activePools = Object.keys(PoolConfig.pools)
	.filter(pool => PoolConfig.pools[pool].deprecated !== true)
	.map(pool => ({ ...PoolConfig.pools[pool], name: pool }));
