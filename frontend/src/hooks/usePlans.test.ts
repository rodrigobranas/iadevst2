import { renderHook, waitFor } from '@testing-library/react';
import { usePlans } from './usePlans';
import type { Tool } from '../types/plan';

const mockToolsData: Tool[] = [
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    slug: 'copilot',
    plans: [
      { id: 'copilot-free', name: 'Free', price: 0, type: 'individual', limits: [], models: [], highlights: [] },
      { id: 'copilot-pro', name: 'Pro', price: 10, type: 'individual', limits: [], models: [], highlights: [] },
      { id: 'copilot-business', name: 'Business', price: 19, type: 'enterprise', limits: [], models: [], highlights: [] },
    ],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    slug: 'cursor',
    plans: [
      { id: 'cursor-free', name: 'Hobby', price: 0, type: 'individual', limits: [], models: [], highlights: [] },
      { id: 'cursor-pro', name: 'Pro', price: 20, type: 'individual', limits: [], models: [], highlights: [] },
      { id: 'cursor-business', name: 'Business', price: 40, type: 'enterprise', limits: [], models: [], highlights: [] },
    ],
  },
];

describe('usePlans', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('should start with loading state', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => usePlans());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.tools).toEqual([]);
  });

  it('should fetch tools data successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ tools: mockToolsData }),
    });
    const { result } = renderHook(() => usePlans());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.tools).toHaveLength(2);
    expect(result.current.error).toBeNull();
  });

  it('should set error on fetch failure', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    const { result } = renderHook(() => usePlans());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.error).not.toBeNull();
  });

  it('should filter plans by budget', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ tools: mockToolsData }),
    });
    const { result } = renderHook(() => usePlans());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    const filteredTools = result.current.filterByBudget(15);
    expect(filteredTools[0].plans).toHaveLength(2);
    expect(filteredTools[0].plans.every(p => p.price <= 15)).toBe(true);
  });

  it('should filter plans by type individual', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ tools: mockToolsData }),
    });
    const { result } = renderHook(() => usePlans());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    const filteredTools = result.current.filterByBudget(200, 'individual');
    expect(filteredTools[0].plans.every(p => p.type === 'individual')).toBe(true);
  });

  it('should filter plans by type enterprise', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ tools: mockToolsData }),
    });
    const { result } = renderHook(() => usePlans());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    const filteredTools = result.current.filterByBudget(200, 'enterprise');
    expect(filteredTools[0].plans.every(p => p.type === 'enterprise')).toBe(true);
  });

  it('should sort plans by price descending', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ tools: mockToolsData }),
    });
    const { result } = renderHook(() => usePlans());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    const filteredTools = result.current.filterByBudget(200, 'individual');
    const prices = filteredTools[0].plans.map(p => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  it('should filter by both budget and type', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ tools: mockToolsData }),
    });
    const { result } = renderHook(() => usePlans());
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    const filteredTools = result.current.filterByBudget(30, 'enterprise');
    const copilotPlans = filteredTools.find(t => t.id === 'github-copilot')?.plans;
    expect(copilotPlans?.every(p => p.price <= 30 && p.type === 'enterprise')).toBe(true);
  });
});
