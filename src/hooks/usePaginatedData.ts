import { Favorite } from '@store/favorites/interfaces/favorites';
import { WordViewRecord } from '@store/history/interfaces/history';
import * as React from 'react';
export type IWordPaginationData = string | Favorite | WordViewRecord
export function usePaginatedData<T extends IWordPaginationData>(data: T[], itemsPerPage: number, initialDisplayCount: number) {
  const [dataSource, setDataSource] = React.useState<T[]>([]);
  const [offset, setOffset] = React.useState(1);

  React.useEffect(() => {
    if (data.length > 0 && dataSource.length < data.length) {
      if (offset === 1) {
        setDataSource(data.slice(0, offset * initialDisplayCount));
      }
    }
    if (data.length === 0)
      setDataSource([])
  }, [data, offset]);

  const getData = React.useCallback(() => {
    if (data.length > 0 && dataSource.length < data.length) {
      setOffset((prevOffset) => {
        const newOffset = prevOffset + 1;
        setDataSource(data.slice(0, newOffset * itemsPerPage));
        return newOffset;
      });
    }
  }, [data, dataSource.length, itemsPerPage]);

  return { dataSource, offset, getData };
};