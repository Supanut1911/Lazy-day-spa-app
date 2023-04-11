import { render, screen } from '@testing-library/react';
import { renderWithQuery } from 'test-utils';

import { Treatments } from '../Treatments';

test('renders response from query', async () => {
  renderWithQuery(<Treatments />);
  const treatmentTitles = await screen.findAllByRole('heading', {
    name: /Massage|facial|scrub/i,
  });

  expect(treatmentTitles).toHaveLength(3);
});
