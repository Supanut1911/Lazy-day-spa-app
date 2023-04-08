import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import type { User } from '../../../shared/types';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../user-storage';

async function getUser(user: User | null): Promise<User | null> {
  console.log('call1');
  if (!user) return null;
  console.log('call2');

  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
    },
  );
  console.log('call3');

  console.log('data =>', data);
  return data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  // TODO: call useQuery to update user data from server
  // const user = null;
  const queryClinet = useQueryClient();
  const { data: user } = useQuery([queryKeys.user], () => getUser(user));

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // TODO: update the user in the query cache
    queryClinet.setQueryData([queryKeys.user], newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // TODO: reset user to null in query cache
    queryClinet.setQueryData([queryKeys.user], null);
  }

  return { user, updateUser, clearUser };
}
