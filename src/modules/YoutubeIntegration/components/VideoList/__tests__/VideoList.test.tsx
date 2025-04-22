import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { VideoList } from '../index';
import { useVideos } from '../../../hooks/useVideos';

// Mock the useVideos hook
jest.mock('../../../hooks/useVideos');
const mockUseVideos = useVideos as jest.MockedFunction<typeof useVideos>;

// Mock data
const mockVideos = [
  {
    id: '1',
    title: 'Test Video 1',
    description: 'Test Description 1',
    thumbnailUrl: 'https://example.com/thumb1.jpg',
    duration: 120,
    category: 'training',
    tags: ['test'],
    publishedAt: '2024-03-20T10:00:00Z',
    metrics: {
      views: 1000,
      likes: 100,
      comments: 50,
      averageWatchTime: 90,
      completionRate: 0.8,
    },
  },
  {
    id: '2',
    title: 'Test Video 2',
    description: 'Test Description 2',
    thumbnailUrl: 'https://example.com/thumb2.jpg',
    duration: 180,
    category: 'training',
    tags: ['test'],
    publishedAt: '2024-03-21T10:00:00Z',
    metrics: {
      views: 2000,
      likes: 200,
      comments: 100,
      averageWatchTime: 150,
      completionRate: 0.9,
    },
  },
];

// Setup QueryClient for testing
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('VideoList', () => {
  const mockOnVideoSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseVideos.mockReturnValue({
      videos: [],
      isLoading: true,
      error: null,
      refreshVideos: jest.fn(),
    });

    render(
      <VideoList
        category="training"
        onVideoSelect={mockOnVideoSelect}
      />,
      { wrapper }
    );

    expect(screen.getAllByRole('progressbar')).toHaveLength(6);
  });

  it('renders error state', () => {
    mockUseVideos.mockReturnValue({
      videos: [],
      isLoading: false,
      error: new Error('Failed to load'),
      refreshVideos: jest.fn(),
    });

    render(
      <VideoList
        category="training"
        onVideoSelect={mockOnVideoSelect}
      />,
      { wrapper }
    );

    expect(screen.getByText(/Error loading videos/i)).toBeInTheDocument();
  });

  it('renders empty state', () => {
    mockUseVideos.mockReturnValue({
      videos: [],
      isLoading: false,
      error: null,
      refreshVideos: jest.fn(),
    });

    render(
      <VideoList
        category="training"
        onVideoSelect={mockOnVideoSelect}
      />,
      { wrapper }
    );

    expect(screen.getByText(/No videos found/i)).toBeInTheDocument();
  });

  it('renders video list', () => {
    mockUseVideos.mockReturnValue({
      videos: mockVideos,
      isLoading: false,
      error: null,
      refreshVideos: jest.fn(),
    });

    render(
      <VideoList
        category="training"
        onVideoSelect={mockOnVideoSelect}
      />,
      { wrapper }
    );

    expect(screen.getByText('Test Video 1')).toBeInTheDocument();
    expect(screen.getByText('Test Video 2')).toBeInTheDocument();
    expect(screen.getByText('1,000 views')).toBeInTheDocument();
    expect(screen.getByText('2,000 views')).toBeInTheDocument();
  });

  it('calls onVideoSelect when clicking a video', () => {
    mockUseVideos.mockReturnValue({
      videos: mockVideos,
      isLoading: false,
      error: null,
      refreshVideos: jest.fn(),
    });

    render(
      <VideoList
        category="training"
        onVideoSelect={mockOnVideoSelect}
      />,
      { wrapper }
    );

    fireEvent.click(screen.getByText('Test Video 1'));
    expect(mockOnVideoSelect).toHaveBeenCalledWith('1');
  });

  it('filters videos by category', () => {
    mockUseVideos.mockReturnValue({
      videos: mockVideos,
      isLoading: false,
      error: null,
      refreshVideos: jest.fn(),
    });

    render(
      <VideoList
        category="training"
        onVideoSelect={mockOnVideoSelect}
      />,
      { wrapper }
    );

    expect(mockUseVideos).toHaveBeenCalledWith({
      category: 'training',
      searchTerm: undefined,
    });
  });

  it('filters videos by search term', () => {
    mockUseVideos.mockReturnValue({
      videos: mockVideos,
      isLoading: false,
      error: null,
      refreshVideos: jest.fn(),
    });

    render(
      <VideoList
        searchTerm="test"
        onVideoSelect={mockOnVideoSelect}
      />,
      { wrapper }
    );

    expect(mockUseVideos).toHaveBeenCalledWith({
      category: undefined,
      searchTerm: 'test',
    });
  });
}); 