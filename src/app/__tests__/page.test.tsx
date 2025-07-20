import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home Page', () => {
  it('should render the main heading', () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', {
      name: /Elevate Your Productivity with TaskZenith/i,
    });
    
    expect(heading).toBeInTheDocument();
  });

  it('should render the brand name', () => {
    render(<Home />);
    
    const brandName = screen.getByText('TaskZenith');
    
    expect(brandName).toBeInTheDocument();
  });
});
