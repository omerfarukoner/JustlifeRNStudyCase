import { act, renderHook } from '@testing-library/react-hooks';
import { useAllCards } from '../../src/hooks/useAllCards';
import * as cacheService from '../../src/services/cacheService';
import * as cardService from '../../src/services/cardService';
import { mockCardTypes, mockCards, mockCardsByType } from '../mocks/mockData';

const mockAbort = jest.fn();
const mockAbortController = {
  signal: { aborted: false },
  abort: mockAbort,
};

jest.mock('../../src/services/cardService', () => ({
  fetchAllCards: jest.fn(),
}));

jest.mock('../../src/services/cacheService', () => ({
  getAllCardsCache: jest.fn(),
  getCardsByTypeCache: jest.fn(),
  getCardTypesCache: jest.fn(),
  setAllCardsCache: jest.fn(),
  setCardsByTypeCache: jest.fn(),
  setCardTypesCache: jest.fn(),
  updateCacheTimestamp: jest.fn(),
}));

interface CustomGlobal {
  AbortController: {
    new (): {
      signal: { aborted: boolean };
      abort: () => void;
    };
    prototype: AbortController;
  };
}
declare const global: CustomGlobal & typeof globalThis;

const originalAbortController = global.AbortController;

describe('useAllCards', () => {
  beforeAll(() => {
    global.AbortController = jest.fn(() => mockAbortController);
  });

  afterAll(() => {
    global.AbortController = originalAbortController;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockAbortController.signal.aborted = false;
  });

  it('should return loading state at the beginning', async () => {
    (cacheService.getAllCardsCache as jest.Mock).mockReturnValue(null);
    (cacheService.getCardTypesCache as jest.Mock).mockReturnValue(null);
    (cacheService.getCardsByTypeCache as jest.Mock).mockReturnValue(null);
    (cardService.fetchAllCards as jest.Mock).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useAllCards());

    expect(result.current.loading).toBe(true);
    expect(result.current.allCards).toEqual([]);
    expect(result.current.uniqueTypes).toEqual([]);
    expect(result.current.cardsByType).toEqual({});
    expect(result.current.error).toBe(null);
  });

  it('should fetch cards from API if cache is empty', async () => {
    (cacheService.getAllCardsCache as jest.Mock).mockReturnValue(null);
    (cacheService.getCardTypesCache as jest.Mock).mockReturnValue(null);
    (cacheService.getCardsByTypeCache as jest.Mock).mockReturnValue(null);

    let resolvePromise: (value: typeof mockCards) => void;
    const fetchPromise = new Promise<typeof mockCards>(resolve => {
      resolvePromise = resolve;
    });
    (cardService.fetchAllCards as jest.Mock).mockReturnValue(fetchPromise);

    const { result } = renderHook(() => useAllCards());
    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolvePromise!(mockCards);
      await fetchPromise;
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.allCards).toEqual(mockCards);
    expect(result.current.uniqueTypes.sort()).toEqual(mockCardTypes.sort());
    expect(result.current.cardsByType).toEqual(mockCardsByType);
    expect(result.current.error).toBe(null);

    expect(cacheService.setAllCardsCache).toHaveBeenCalledWith(mockCards);
    expect(cacheService.setCardTypesCache).toHaveBeenCalled();
    expect(cacheService.setCardsByTypeCache).toHaveBeenCalled();
    expect(cacheService.updateCacheTimestamp).toHaveBeenCalled();
  });

  it('should load data from cache if available', async () => {
    (cacheService.getAllCardsCache as jest.Mock).mockReturnValue(mockCards);
    (cacheService.getCardTypesCache as jest.Mock).mockReturnValue(mockCardTypes);
    (cacheService.getCardsByTypeCache as jest.Mock).mockReturnValue(mockCardsByType);

    let { result } = renderHook(() => useAllCards());

    expect(result.current.loading).toBe(false);
    expect(result.current.allCards).toEqual(mockCards);
    expect(result.current.uniqueTypes).toEqual(mockCardTypes);
    expect(result.current.cardsByType).toEqual(mockCardsByType);
    expect(cardService.fetchAllCards).not.toHaveBeenCalled();
  });

  it('should update error state if API call fails', async () => {
    (cacheService.getAllCardsCache as jest.Mock).mockReturnValue(null);
    (cacheService.getCardTypesCache as jest.Mock).mockReturnValue(null);
    (cacheService.getCardsByTypeCache as jest.Mock).mockReturnValue(null);

    const testError = new Error('API Error');
    let rejectPromise: (error: Error) => void;
    const errorPromise = new Promise<typeof mockCards>((_, reject) => {
      rejectPromise = reject;
    });
    (cardService.fetchAllCards as jest.Mock).mockReturnValue(errorPromise);

    const { result } = renderHook(() => useAllCards());

    await act(async () => {
      rejectPromise!(testError);
      try {
        await errorPromise;
      } catch {}
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(testError);
    expect(result.current.allCards).toEqual([]);
  });

  it('should cancel API request when component unmounts', async () => {
    (cacheService.getAllCardsCache as jest.Mock).mockReturnValue(null);
    (cacheService.getCardTypesCache as jest.Mock).mockReturnValue(null);
    (cacheService.getCardsByTypeCache as jest.Mock).mockReturnValue(null);

    let resolvePromise: (value: typeof mockCards) => void;
    const fetchPromise = new Promise<typeof mockCards>(resolve => {
      resolvePromise = resolve;
    });
    (cardService.fetchAllCards as jest.Mock).mockReturnValue(fetchPromise);

    const { unmount } = renderHook(() => useAllCards());
    expect(global.AbortController).toHaveBeenCalled();

    act(() => {
      unmount();
    });

    expect(mockAbort).toHaveBeenCalled();
  });
});
