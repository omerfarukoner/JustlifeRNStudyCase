export const API_ENDPOINTS = {
  BASE_URL: 'https://omgvamp-hearthstone-v1.p.rapidapi.com',
  CARDS: '/cards',
};

export const API_TIMEOUT = 320000;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
  'x-rapidapi-key': '12e5a45492msh27aa8fd95709e6cp1523a0jsn5ebe5f994d5f',
};

export const API_CONFIG = {
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
};

export const API_PARAMS = {
  COLLECTIBLE: '1',
  LOCALE: 'enUS',
};
