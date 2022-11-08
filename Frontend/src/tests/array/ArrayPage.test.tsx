import { render, screen } from '@testing-library/react';
import ArrayPage from '../../presentation/array/ArrayPage';
import '@testing-library/jest-dom';

describe('ArrayPage', () => {
  beforeEach(() => {
    render(<ArrayPage />);
  });

  it('renders the default ArrayPage', () => {
    expect(screen.getByText('Your array is empty!').className).toBe(
      'empty-ds-label'
    );
  });
});
