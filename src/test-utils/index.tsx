import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';

// import { defaultQueryClientOptions } from '../react-query/queryClient';

const generateQueryClient = () => {
  return new QueryClient();
};

// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
export const renderWithQuery = (
  ui: ReactElement,
  client?: QueryClient,
): RenderResult => {
  const queryClient = client ?? generateQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};
