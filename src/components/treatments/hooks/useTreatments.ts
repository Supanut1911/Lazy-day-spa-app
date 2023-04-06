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
  const { data = fallback } = useQuery([queryKeys.treatments], getTreatments, {
    staleTime: 60000,
    cacheTime: 90000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return data;
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery([queryKeys.treatments], getTreatments, {
    staleTime: 60000,
    cacheTime: 90000,
  });
}
