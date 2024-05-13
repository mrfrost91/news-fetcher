import { useEffect } from 'react';

const useAbortController = (callback: (signal: AbortSignal) => Promise<void>): void => {
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    // eslint-disable-next-line no-void
    void callback(signal);

    return () => {
      abortController.abort();
    };
  }, [callback]);
};

export default useAbortController;
