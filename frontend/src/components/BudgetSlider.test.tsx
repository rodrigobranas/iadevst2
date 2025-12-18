import { render, screen } from '@testing-library/react';
import { BudgetSlider } from './BudgetSlider';

describe('BudgetSlider', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render slider with default value', () => {
    render(<BudgetSlider value={50} onChange={mockOnChange} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('should display current budget value', () => {
    render(<BudgetSlider value={100} onChange={mockOnChange} />);
    expect(screen.getByText('$100/month')).toBeInTheDocument();
  });

  it('should display $0 when value is 0', () => {
    render(<BudgetSlider value={0} onChange={mockOnChange} />);
    expect(screen.getByText('$0/month')).toBeInTheDocument();
  });

  it('should display max value $200', () => {
    render(<BudgetSlider value={200} onChange={mockOnChange} />);
    expect(screen.getByText('$200/month')).toBeInTheDocument();
  });

  it('should have correct min value of 0', () => {
    render(<BudgetSlider value={50} onChange={mockOnChange} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
  });

  it('should have correct max value of 200', () => {
    render(<BudgetSlider value={50} onChange={mockOnChange} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemax', '200');
  });

  it('should have correct step of 10', () => {
    render(<BudgetSlider value={50} onChange={mockOnChange} />);
    const slider = screen.getByRole('slider');
    expect(slider.closest('[data-step="10"]')).toBeInTheDocument();
  });

  it('should display label', () => {
    render(<BudgetSlider value={50} onChange={mockOnChange} />);
    expect(screen.getByText('Monthly Budget')).toBeInTheDocument();
  });
});
