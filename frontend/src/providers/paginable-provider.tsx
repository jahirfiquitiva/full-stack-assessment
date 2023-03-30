import {
  type Context,
  type PropsWithChildren,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  createContext,
} from 'react';
import type { BackendResponse } from '../types/backend-response';

export interface PaginableContextData<T> {
  items?: Array<T>;
  setItems?: Dispatch<SetStateAction<Array<T>>>;
  loading: boolean;
  pagesCount?: number;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
}

export function createPaginableContext<T>() {
  return createContext<PaginableContextData<T>>({ loading: true });
}

interface PaginableProviderProps<T> extends PropsWithChildren {
  fetchUrl: string;
  maxItemsPerPage: number;
  context: Context<PaginableContextData<T>>;
}

export function PaginableProvider<T>(props: PaginableProviderProps<T>) {
  const { fetchUrl, maxItemsPerPage, context } = props;

  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Array<T>>([]);

  const urlWithParams = useMemo<string>(() => {
    const url = new URL(fetchUrl);
    url.searchParams.set('page', currentPage.toString());
    url.searchParams.set('limit', maxItemsPerPage.toString());
    return url.toString();
  }, [fetchUrl, currentPage, maxItemsPerPage]);

  useEffect(() => {
    setLoading(true);
    fetch(urlWithParams)
      .then((response) => response.json())
      .then((data: BackendResponse<T | Array<T>>) => {
        setLoading(false);
        if (data.ok) {
          const items: Array<T> = Array.isArray(data.data)
            ? data.data
            : [data.data];
          setItems(items);
          setTotalItemsCount(data.count || items.length || 0);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [urlWithParams]);

  return (
    <context.Provider
      value={{
        items,
        setItems,
        loading,
        currentPage,
        setCurrentPage,
        pagesCount:
          totalItemsCount > 0
            ? Math.ceil(totalItemsCount / maxItemsPerPage)
            : 1,
      }}
    >
      {props.children}
    </context.Provider>
  );
}

export function usePaginable<T>(context: Context<PaginableContextData<T>>) {
  return useContext(context);
}
