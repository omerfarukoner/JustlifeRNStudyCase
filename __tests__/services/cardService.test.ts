import { AxiosError, AxiosHeaders } from 'axios';
import { API_ENDPOINTS } from '../../src/config/apiConfig';
import apiClient from '../../src/services/apiClient';
import { fetchAllCards } from '../../src/services/cardService';
import { mockApiResponse, mockCards } from '../mocks/mockData';

jest.mock('../../src/services/apiClient');

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('fetchAllCards', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return only cards with images', async () => {
    mockedApiClient.get.mockResolvedValue({ data: mockApiResponse });

    const cards = await fetchAllCards();

    expect(mockedApiClient.get).toHaveBeenCalledWith(API_ENDPOINTS.CARDS, {
      signal: undefined,
      params: {
        collectible: '1',
        locale: 'enUS',
      },
    });

    // Sort cards by cardId to ensure consistent order
    expect(cards.sort((a, b) => a.cardId.localeCompare(b.cardId))).toEqual(
      mockCards.sort((a, b) => a.cardId.localeCompare(b.cardId)),
    );
  });

  it('should throw error with status code if AxiosError has response', async () => {
    const mockedHeaders = new AxiosHeaders();
    const axiosError = new AxiosError(
      'Request failed',
      '500',
      { headers: mockedHeaders },
      {},
      {
        status: 500,
        data: {},
        statusText: '',
        headers: mockedHeaders,
        config: { headers: mockedHeaders },
      },
    );
    mockedApiClient.get.mockRejectedValue(axiosError);

    await expect(fetchAllCards()).rejects.toThrow('Failed to fetch Hearthstone cards: 500');
  });

  it('should throw unknown error if error is not AxiosError', async () => {
    const unknownError = new Error('Unknown failure');
    mockedApiClient.get.mockRejectedValue(unknownError);

    await expect(fetchAllCards()).rejects.toThrow('Unknown failure');
  });
});
