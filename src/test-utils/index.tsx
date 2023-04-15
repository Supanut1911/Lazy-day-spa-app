import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { generateQueryClient } from 'react-query/queryClient';
// import { defaultQueryClientOptions } from '../react-query/queryClient';

const generateTestQueryClient = () => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
export const renderWithQuery = (
  ui: ReactElement,
  client?: QueryClient,
): RenderResult => {
  const queryClient = client ?? generateTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};
