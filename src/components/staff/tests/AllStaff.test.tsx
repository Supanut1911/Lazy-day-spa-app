import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { renderWithQuery } from 'test-utils';

// import { renderWithClient } from '../../../test-utils';
// import { defaultQueryClientOptions } from '../../../react-query/queryClient';
import { server } from '../../../mocks/server';
import { AllStaff } from '../AllStaff';
import { Staff } from '../Staff';

test('renders response from query', async () => {
  renderWithQuery(<AllStaff />);
  const allStaffTitle = await screen.findAllByRole('heading', {
    name: /sandra|divya|mateo|michael/i,
  });

  expect(allStaffTitle).toHaveLength(4);
});

test('handles query error', async () => {
  // (re)set handler to return a 500 error for staff
  server.resetHandlers(
    rest.get('http://localhost:3030/staff', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  renderWithQuery(<AllStaff />);

  const alertToast = await screen.findByRole('alert');
  expect(alertToast).toHaveTextContent('Request failed with status code 500');
});
