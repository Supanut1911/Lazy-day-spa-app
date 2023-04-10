import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useCustomToast } from 'components/app/hooks/useCustomToast';
import jsonpatch from 'fast-json-patch';
import { queryKeys } from 'react-query/constants';

import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import type { User } from '../../../shared/types';
import { useUser } from './useUser';
// for when we need a server function
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null,
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData),
    },
  );
  return data.user;
}

// TODO: update type to UseMutateFunction type
export function usePatchUser(): UseMutateFunction<
  User,
  unknown,
  User,
  unknown
> {
  const toast = useCustomToast();
  const { user, updateUser } = useUser();
  const queryClinet = useQueryClient();
  const { mutate: patchUser } = useMutation(
    (newUserData: User) => patchUserOnServer(newUserData, user),
    {
      // onMutate is return context that pass to onError
      onMutate: async (newData: User | null) => {
        // cancel any outgoing quries for user data, so old server data doesn't overwrite our optimistic update
        queryClinet.cancelQueries([queryKeys.user]);

        // snapshot previous user value
        const previousData: User = queryClinet.getQueryData([queryKeys.user]);

        // optimistic update the cache with new user value
        updateUser(newData);

        // return context object with snapshot value
        return { previousData };
      },
      onError: (error, newData, context) => {
        // rollback cache to the save value
        if (context.previousData) {
          updateUser(context.previousData);
          toast({
            title: 'update failed restoring previous value',
            status: 'warning',
          });
        }
      },

      onSuccess: (userDataResponse: User | null) => {
        if (userDataResponse) {
          // no need call updateUser cause it will call at optimistic
          // updateUser(userDataResponse);
          toast({
            title: 'User updated!',
            status: 'success',
          });
        }
      },
      onSettled: () => {
        // invalidate user query to make sure we're in sync with the server (refetch)
        queryClinet.invalidateQueries([queryKeys.user]);
      },
    },
  );
  return patchUser;
}
