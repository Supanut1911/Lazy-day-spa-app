import { useQuery, useQueryClient } from '@tanstack/react-query';

import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import type { Treatment } from '../../../shared/types';
import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
const getTreatments = async (): Promise<Treatment[]> => {
  const { data } = await axiosInstance.get('/treatments');
  return data;
};
export function useTreatments(): Treatment[] {
  const fallback = [];
  const toast = useCustomToast();
  const { data = fallback } = useQuery(
    [queryKeys.treatments],
    getTreatments,
    //   {
    //   onError: (error) => {
    //     const title =
    //       error instanceof Error ? error.message : 'error connection to server';
    //     toast({ title, status: 'error' });
    //   },
    // }
  );
  return data;
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery([queryKeys.treatments], getTreatments);
}
