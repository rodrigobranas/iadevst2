import { render, screen } from '@testing-library/react';
import { ToolsGrid } from './ToolsGrid';
import type { Tool } from '../types/plan';

const mockTools: Tool[] = [
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    slug: 'copilot',
    plans: [
      { id: 'copilot-pro', name: 'Pro', price: 10, type: 'individual', limits: ['Unlimited'], models: ['GPT-5'], highlights: ['Agent'] },
    ],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    slug: 'cursor',
    plans: [
      { id: 'cursor-pro', name: 'Pro', price: 20, type: 'individual', limits: ['Extended'], models: ['GPT-4o'], highlights: ['Background'] },
    ],
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    slug: 'claude',
    plans: [
      { id: 'claude-pro', name: 'Pro', price: 20, type: 'individual', limits: ['Standard'], models: ['Sonnet'], highlights: ['Code'] },
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    slug: 'windsurf',
    plans: [
      { id: 'windsurf-pro', name: 'Pro', price: 15, type: 'individual', limits: ['Extended'], models: ['All'], highlights: ['Cascade'] },
    ],
  },
];

describe('ToolsGrid', () => {
  it('should render all 4 tools', () => {
    render(<ToolsGrid tools={mockTools} />);
    expect(screen.getByText('GitHub Copilot')).toBeInTheDocument();
    expect(screen.getByText('Cursor')).toBeInTheDocument();
    expect(screen.getByText('Claude Code')).toBeInTheDocument();
    expect(screen.getByText('Windsurf')).toBeInTheDocument();
  });

  it('should render tools in correct order', () => {
    render(<ToolsGrid tools={mockTools} />);
    const toolHeaders = screen.getAllByTestId('tool-header');
    expect(toolHeaders[0]).toHaveTextContent('GitHub Copilot');
    expect(toolHeaders[1]).toHaveTextContent('Cursor');
    expect(toolHeaders[2]).toHaveTextContent('Claude Code');
    expect(toolHeaders[3]).toHaveTextContent('Windsurf');
  });

  it('should have 4 column grid layout class', () => {
    render(<ToolsGrid tools={mockTools} />);
    const grid = screen.getByTestId('tools-grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('lg:grid-cols-4');
  });

  it('should render plans for each tool', () => {
    render(<ToolsGrid tools={mockTools} />);
    expect(screen.getAllByTestId('plan-card')).toHaveLength(4);
  });

  it('should display empty state when tool has no plans', () => {
    const toolsWithEmpty: Tool[] = [
      { ...mockTools[0], plans: [] },
      ...mockTools.slice(1),
    ];
    render(<ToolsGrid tools={toolsWithEmpty} />);
    expect(screen.getByText('No plans available for this budget')).toBeInTheDocument();
  });
});
