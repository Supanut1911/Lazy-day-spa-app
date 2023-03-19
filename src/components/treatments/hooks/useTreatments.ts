import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import type { Treatment } from '../../../shared/types';
import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
const getTreatments = async (): Promise<Treatment[]> => {
  const { data } = await axiosInstance.get('/treatments');
  console.log('called');

  return data;
};
export function useTreatments(): Treatment[] {
  const fallback = [];
  const { data = fallback } = useQuery([queryKeys.treatments], getTreatments);
  return data;
}
