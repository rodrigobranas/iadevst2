import { render, screen, fireEvent } from '@testing-library/react';
import { PlanTypeFilter } from './PlanTypeFilter';

describe('PlanTypeFilter', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Individual and Enterprise options', () => {
    render(<PlanTypeFilter value="individual" onChange={mockOnChange} />);
    expect(screen.getByText('Individual')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('should highlight Individual when selected', () => {
    render(<PlanTypeFilter value="individual" onChange={mockOnChange} />);
    const individualButton = screen.getByRole('button', { name: /individual/i });
    expect(individualButton).toHaveClass('bg-primary');
  });

  it('should highlight Enterprise when selected', () => {
    render(<PlanTypeFilter value="enterprise" onChange={mockOnChange} />);
    const enterpriseButton = screen.getByRole('button', { name: /enterprise/i });
    expect(enterpriseButton).toHaveClass('bg-primary');
  });

  it('should call onChange with enterprise when clicking Enterprise', () => {
    render(<PlanTypeFilter value="individual" onChange={mockOnChange} />);
    const enterpriseButton = screen.getByRole('button', { name: /enterprise/i });
    fireEvent.click(enterpriseButton);
    expect(mockOnChange).toHaveBeenCalledWith('enterprise');
  });

  it('should call onChange with individual when clicking Individual', () => {
    render(<PlanTypeFilter value="enterprise" onChange={mockOnChange} />);
    const individualButton = screen.getByRole('button', { name: /individual/i });
    fireEvent.click(individualButton);
    expect(mockOnChange).toHaveBeenCalledWith('individual');
  });

  it('should have accessible label', () => {
    render(<PlanTypeFilter value="individual" onChange={mockOnChange} />);
    expect(screen.getByText('Plan Type')).toBeInTheDocument();
  });
});
