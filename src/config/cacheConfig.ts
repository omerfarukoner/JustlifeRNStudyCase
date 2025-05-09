export interface CacheConfig {
  enabled: boolean;
  duration: number;
}

const ONE_HOUR = 60 * 60 * 1000;

const cacheConfig: CacheConfig = {
  enabled: true,
  duration: 48 * ONE_HOUR,
};

export default cacheConfig;
