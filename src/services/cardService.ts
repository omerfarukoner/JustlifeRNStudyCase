import { AxiosError } from 'axios';
import { API_ENDPOINTS, API_PARAMS } from '../config/apiConfig';
import { Card, CardResponse } from '../types/card.types';
import { retry } from '../utils/retry';
import apiClient from './apiClient';

const getHearthstoneClient = () => {
  return apiClient;
};

const fetchWithRetry = async <T>(
  url: string,
  errorMessage: string,
  signal?: AbortSignal,
  params?: Record<string, string>,
): Promise<T> => {
  return retry(
    async abortSignal => {
      try {
        const response = await getHearthstoneClient().get(url, { signal: abortSignal, params });
        return response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          throw new Error(`${errorMessage}: ${error.response.status}`);
        }
        throw error;
      }
    },
    2,
    1000,
    1,
    signal,
  );
};

export const fetchAllCards = async (signal?: AbortSignal): Promise<Card[]> => {
  const response = await fetchWithRetry<CardResponse>(
    API_ENDPOINTS.CARDS,
    'Failed to fetch Hearthstone cards',
    signal,
    { collectible: API_PARAMS.COLLECTIBLE, locale: API_PARAMS.LOCALE },
  );

  let allCards: Card[] = [];
  Object.values(response).forEach(setCards => {
    if (Array.isArray(setCards)) {
      allCards = [...allCards, ...setCards.filter(card => card.img)];
    }
  });

  return allCards;
};
