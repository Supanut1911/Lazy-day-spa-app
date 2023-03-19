import dayjs from 'dayjs';

import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import type { Appointment, User } from '../../../shared/types';
import { useUser } from './useUser';

// for when we need a query function for useQuery
// async function getUserAppointments(
//   user: User | null,
// ): Promise<Appointment[] | null> {
//   if (!user) return null;
//   const { data } = await axiosInstance.get(`/user/${user.id}/appointments`, {
//     headers: getJWTHeader(user),
//   });
//   return data.appointments;
// }

export function useUserAppointments(): Appointment[] {
  // TODO replace with React Query
  return [];
}
