import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';

import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import type { Staff } from '../../../shared/types';
import { filterByTreatment } from '../utils';

// for when we need a query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all');

  // TODO: get data from server via useQuery
  const staffFallback = [];
  const { data: staff = staffFallback } = useQuery([queryKeys.staff], getStaff);
  return { staff, filter, setFilter };
}
