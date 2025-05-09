import axios from 'axios';
import Logger from './logger';

export const retry = async <T>(
  fn: (signal?: AbortSignal) => Promise<T>,
  retriesLeft = 3,
  delay = 1000,
  attempt = 1,
  signal?: AbortSignal,
): Promise<T> => {
  try {
    return await fn(signal);
  } catch (err: unknown) {
    if (retriesLeft <= 0) {
      Logger.error(`Max retries reached`, err);
      throw err;
    }

    if (signal?.aborted) {
      throw new DOMException('Request aborted', 'AbortError');
    }

    const status = axios.isAxiosError(err)
      ? err.response?.status
      : (err as any)?.status || (err as any)?.response?.status;

    const isServerError = typeof status === 'number' && status >= 500 && status < 600;
    if (!isServerError) throw err;

    Logger.warn(`Retrying request - attempt ${attempt}/${attempt + retriesLeft - 1}`, {
      status,
      url: axios.isAxiosError(err) ? err.config?.url : undefined,
    });

    await new Promise(resolve => setTimeout(resolve, delay * attempt));
    return retry(fn, retriesLeft - 1, delay, attempt + 1, signal);
  }
};
