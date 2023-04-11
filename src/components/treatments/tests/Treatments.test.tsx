import { render, screen } from '@testing-library/react';
import { renderWithQuery } from 'test-utils';

import { Treatments } from '../Treatments';

test('renders response from query', () => {
  renderWithQuery(<Treatments />);
});
