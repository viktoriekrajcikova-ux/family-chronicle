import { useCallback, useState } from "react";

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useAsync<T, Args extends any[]>(
  asyncFn: (...args: Args) => Promise<T>
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const run = useCallback(
    async (...args: Args): Promise<T> => {
      setState({ data: null, loading: true, error: null });

      try {
        const result = await asyncFn(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err: any) {
        const message =
          err?.message ?? "Něco se pokazilo při async operaci.";
        setState({ data: null, loading: false, error: message });
        throw err;
      }
    },
    [asyncFn]
  );

  return {
    ...state,
    run,
  };
}
