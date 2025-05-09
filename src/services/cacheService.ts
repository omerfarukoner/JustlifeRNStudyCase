import { MMKV } from 'react-native-mmkv';
import cacheConfig from '../config/cacheConfig';
import { Card } from '../types/card.types';

const CARD_TYPES_KEY = 'card_types';
const ALL_CARDS_KEY = 'all_cards';
const CARDS_BY_TYPE_KEY = 'cards_by_type';
const CACHE_TIMESTAMP_KEY = 'cache_timestamp';

interface CacheData<T> {
  timestamp: number;
  data: T;
}

export const cardStorage = new MMKV({
  id: 'hearthstone-cache',
});

export const isValidCache = (timestamp: number): boolean => {
  return cacheConfig.enabled && Date.now() - timestamp < cacheConfig.duration;
};

export const setAllCardsCache = (cards: Card[]): void => {
  if (!cacheConfig.enabled) return;

  cardStorage.set(
    ALL_CARDS_KEY,
    JSON.stringify({
      timestamp: Date.now(),
      data: cards,
    }),
  );
};

export const getAllCardsCache = (): Card[] | null => {
  if (!cacheConfig.enabled) return null;

  const cached = cardStorage.getString(ALL_CARDS_KEY);
  if (!cached) return null;

  const { timestamp, data } = JSON.parse(cached) as CacheData<Card[]>;
  return isValidCache(timestamp) ? data : null;
};

export const setCardTypesCache = (types: string[]): void => {
  if (!cacheConfig.enabled) return;

  cardStorage.set(
    CARD_TYPES_KEY,
    JSON.stringify({
      timestamp: Date.now(),
      data: types,
    }),
  );
};

export const getCardTypesCache = (): string[] | null => {
  if (!cacheConfig.enabled) return null;

  const cached = cardStorage.getString(CARD_TYPES_KEY);
  if (!cached) return null;

  const { timestamp, data } = JSON.parse(cached) as CacheData<string[]>;
  return isValidCache(timestamp) ? data : null;
};

export const setCardsByTypeCache = (cardsByType: Record<string, Card[]>): void => {
  if (!cacheConfig.enabled) return;

  cardStorage.set(
    CARDS_BY_TYPE_KEY,
    JSON.stringify({
      timestamp: Date.now(),
      data: cardsByType,
    }),
  );
};

export const getCardsByTypeCache = (): Record<string, Card[]> | null => {
  if (!cacheConfig.enabled) return null;

  const cached = cardStorage.getString(CARDS_BY_TYPE_KEY);
  if (!cached) return null;

  const { timestamp, data } = JSON.parse(cached) as CacheData<Record<string, Card[]>>;
  return isValidCache(timestamp) ? data : null;
};

export const updateCacheTimestamp = (): void => {
  if (!cacheConfig.enabled) return;
  cardStorage.set(CACHE_TIMESTAMP_KEY, Date.now().toString());
};

export const getCacheTimestamp = (): number | null => {
  if (!cacheConfig.enabled) return null;

  const timestamp = cardStorage.getString(CACHE_TIMESTAMP_KEY);
  return timestamp ? parseInt(timestamp, 10) : null;
};

export const clearCacheByKey = (key: string): void => {
  cardStorage.delete(key);
};

export const clearAllCache = (): void => {
  cardStorage.clearAll();
};
