import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchAllCards } from '../services/cardService';
import {
  getAllCardsCache,
  getCardsByTypeCache,
  getCardTypesCache,
  setAllCardsCache,
  setCardsByTypeCache,
  setCardTypesCache,
  updateCacheTimestamp,
} from '../services/cacheService';
import { Card } from '../types/card.types';

interface UseAllCardsResult {
  allCards: Card[];
  uniqueTypes: string[];
  cardsByType: Record<string, Card[]>;
  loading: boolean;
  error: Error | null;
}

export const useAllCards = (): UseAllCardsResult => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [cardsByType, setCardsByType] = useState<Record<string, Card[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const processCardsData = useCallback((cards: Card[]) => {
    const typesSet = new Set<string>();
    const typeMap: Record<string, Card[]> = {};

    cards.forEach(card => {
      if (card.type) {
        typesSet.add(card.type);

        if (!typeMap[card.type]) {
          typeMap[card.type] = [];
        }
        typeMap[card.type].push(card);
      }
    });

    const types = Array.from(typesSet).sort();

    setAllCards(cards);
    setUniqueTypes(types);
    setCardsByType(typeMap);

    setAllCardsCache(cards);
    setCardTypesCache(types);
    setCardsByTypeCache(typeMap);
    updateCacheTimestamp();

    return { types, typeMap };
  }, []);

  const fetchAndProcessCards = useCallback(async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;

      setLoading(true);
      const freshData = await fetchAllCards(signal);

      if (!signal.aborted) {
        processCardsData(freshData);
        setError(null);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
      setError(err instanceof Error ? err : new Error('Failed to fetch all cards'));
    } finally {
      if (abortControllerRef.current?.signal.aborted === false) {
        setLoading(false);
      }
    }
  }, [processCardsData]);

  const loadFromCache = useCallback(() => {
    const cachedCards = getAllCardsCache();
    const cachedTypes = getCardTypesCache();
    const cachedCardsByType = getCardsByTypeCache();

    if (cachedCards && cachedTypes && cachedCardsByType) {
      setAllCards(cachedCards);
      setUniqueTypes(cachedTypes);
      setCardsByType(cachedCardsByType);
      setLoading(false);
      return true;
    }

    return false;
  }, []);

  useEffect(() => {
    const hasLoadedFromCache = loadFromCache();

    if (!hasLoadedFromCache) {
      fetchAndProcessCards();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchAndProcessCards, loadFromCache]);

  return {
    allCards,
    uniqueTypes,
    cardsByType,
    loading,
    error,
  };
};
