import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

const mockToolsData = {
  tools: [
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      slug: 'copilot',
      plans: [
        { id: 'copilot-free', name: 'Free', price: 0, type: 'individual', limits: [], models: [], highlights: [] },
      ],
    },
  ],
};

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    localStorage.clear();
  });

  it('should render the main title', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockToolsData),
    });
    render(<App />);
    expect(screen.getByText('AI Code Assistant Comparator')).toBeInTheDocument();
  });

  it('should render budget slider', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockToolsData),
    });
    render(<App />);
    expect(screen.getByText('Monthly Budget')).toBeInTheDocument();
  });

  it('should render plan type filter', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockToolsData),
    });
    render(<App />);
    expect(screen.getByText('Plan Type')).toBeInTheDocument();
  });

  it('should render theme toggle', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockToolsData),
    });
    render(<App />);
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('should show loading state initially', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    const { container } = render(<App />);
    expect(container.querySelector('.animate-spin')).toBeTruthy();
  });

  it('should render tools grid after loading', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockToolsData),
    });
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('GitHub Copilot')).toBeInTheDocument();
    });
  });

  it('should show error state when fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Error loading plans')).toBeInTheDocument();
    });
  });
});
