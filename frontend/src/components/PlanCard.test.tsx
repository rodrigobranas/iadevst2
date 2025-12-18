import { render, screen } from '@testing-library/react';
import { PlanCard } from './PlanCard';
import type { Plan } from '../types/plan';

const mockPlan: Plan = {
  id: 'copilot-pro',
  name: 'Pro',
  price: 10,
  type: 'individual',
  limits: ['Unlimited completions', '300 premium requests/month'],
  models: ['GPT-5', 'Claude Sonnet 4'],
  highlights: ['Coding agent', 'Code review'],
};

describe('PlanCard', () => {
  it('should render plan name', () => {
    render(<PlanCard plan={mockPlan} />);
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('should render plan price', () => {
    render(<PlanCard plan={mockPlan} />);
    expect(screen.getByText('$10/month')).toBeInTheDocument();
  });

  it('should render plan limits', () => {
    render(<PlanCard plan={mockPlan} />);
    expect(screen.getByText('Unlimited completions')).toBeInTheDocument();
    expect(screen.getByText('300 premium requests/month')).toBeInTheDocument();
  });

  it('should render plan models', () => {
    render(<PlanCard plan={mockPlan} />);
    expect(screen.getByText('GPT-5')).toBeInTheDocument();
    expect(screen.getByText('Claude Sonnet 4')).toBeInTheDocument();
  });

  it('should render plan highlights', () => {
    render(<PlanCard plan={mockPlan} />);
    expect(screen.getByText('Coding agent')).toBeInTheDocument();
    expect(screen.getByText('Code review')).toBeInTheDocument();
  });

  it('should render free price correctly', () => {
    const freePlan: Plan = { ...mockPlan, price: 0, name: 'Free' };
    render(<PlanCard plan={freePlan} />);
    const freeElements = screen.getAllByText('Free');
    expect(freeElements).toHaveLength(2);
  });

  it('should have bento style card layout', () => {
    render(<PlanCard plan={mockPlan} />);
    const card = screen.getByTestId('plan-card');
    expect(card).toHaveClass('rounded-xl');
  });
});
