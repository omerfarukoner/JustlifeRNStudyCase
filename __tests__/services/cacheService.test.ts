import cacheConfig from '../../src/config/cacheConfig';
import {
  clearAllCache,
  clearCacheByKey,
  getAllCardsCache,
  getCacheTimestamp,
  getCardTypesCache,
  getCardsByTypeCache,
  isValidCache,
  setAllCardsCache,
  setCardTypesCache,
  setCardsByTypeCache,
  updateCacheTimestamp,
} from '../../src/services/cacheService';
import { mockCardTypes, mockCards, mockCardsByType } from '../mocks/mockData';

const mockStore: Record<string, string> = {};
jest.mock('react-native-mmkv', () => {
  return {
    MMKV: jest.fn(() => ({
      getString: jest.fn((key: string) => mockStore[key] ?? null),
      set: jest.fn((key: string, value: string) => {
        mockStore[key] = value;
      }),
      delete: jest.fn((key: string) => {
        delete mockStore[key];
      }),
      clearAll: jest.fn(() => {
        Object.keys(mockStore).forEach(key => delete mockStore[key]);
      }),
    })),
  };
});

const CARD_TYPES_KEY = 'card_types';
const ALL_CARDS_KEY = 'all_cards';
const CACHE_TIMESTAMP_KEY = 'cache_timestamp';

describe('cacheService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(mockStore).forEach(key => delete mockStore[key]);
    Object.defineProperty(cacheConfig, 'enabled', { get: () => true });
    jest.spyOn(Date, 'now').mockRestore();
  });

  describe('isValidCache', () => {
    it('should validate cache correctly', () => {
      const validTimestamp = Date.now() - 1000 * 60 * 30;
      expect(isValidCache(validTimestamp)).toBe(true);

      const oldTimestamp = Date.now() - 1000 * 60 * 60 * 100;
      expect(isValidCache(oldTimestamp)).toBe(false);

      Object.defineProperty(cacheConfig, 'enabled', { get: () => false });
      expect(isValidCache(Date.now())).toBe(false);
    });
  });

  describe('Cache operations', () => {
    it('should set and get card cache correctly', () => {
      const fakeNow = Date.now();
      jest.spyOn(Date, 'now').mockReturnValue(fakeNow);

      setAllCardsCache(mockCards);
      const result = getAllCardsCache();
      expect(result).toEqual(mockCards);
      expect(JSON.parse(mockStore[ALL_CARDS_KEY]).timestamp).toBe(fakeNow);

      const oldTime = Date.now() - cacheConfig.duration - 1000;
      mockStore[ALL_CARDS_KEY] = JSON.stringify({
        timestamp: oldTime,
        data: mockCards,
      });
      expect(getAllCardsCache()).toBeNull();

      Object.defineProperty(cacheConfig, 'enabled', { get: () => false });
      clearAllCache();
      setAllCardsCache(mockCards);
      expect(mockStore[ALL_CARDS_KEY]).toBeUndefined();
    });

    it('should handle card types cache operations', () => {
      const fakeNow = Date.now();
      jest.spyOn(Date, 'now').mockReturnValue(fakeNow);
      setCardTypesCache(mockCardTypes);
      const result = getCardTypesCache();
      expect(result).toEqual(mockCardTypes);
    });

    it('should handle cards by type cache operations', () => {
      const fakeNow = Date.now();
      jest.spyOn(Date, 'now').mockReturnValue(fakeNow);
      setCardsByTypeCache(mockCardsByType);
      const result = getCardsByTypeCache();
      expect(result).toEqual(mockCardsByType);
    });

    it('should handle timestamp operations', () => {
      const fakeNow = Date.now();
      jest.spyOn(Date, 'now').mockReturnValue(fakeNow);
      updateCacheTimestamp();
      expect(getCacheTimestamp()).toBe(fakeNow);
      delete mockStore[CACHE_TIMESTAMP_KEY];
      expect(getCacheTimestamp()).toBeNull();
    });
  });

  describe('Cache clearing', () => {
    it('should clear cache selectively or completely', () => {
      mockStore[ALL_CARDS_KEY] = JSON.stringify({ timestamp: Date.now(), data: mockCards });
      mockStore[CARD_TYPES_KEY] = JSON.stringify({ timestamp: Date.now(), data: mockCardTypes });

      clearCacheByKey(ALL_CARDS_KEY);
      expect(mockStore[ALL_CARDS_KEY]).toBeUndefined();
      expect(mockStore[CARD_TYPES_KEY]).toBeDefined();

      mockStore[ALL_CARDS_KEY] = JSON.stringify({ timestamp: Date.now(), data: mockCards });
      clearAllCache();
      expect(mockStore[ALL_CARDS_KEY]).toBeUndefined();
      expect(mockStore[CARD_TYPES_KEY]).toBeUndefined();
    });
  });
});
