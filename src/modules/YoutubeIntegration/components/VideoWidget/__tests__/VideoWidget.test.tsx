import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { VideoWidget } from '../index';
import { useVideos } from '../../../hooks/useVideos';

// Mock dependencies
jest.mock('../../../hooks/useVideos');
jest.mock('../../VideoPlayer', () => ({
  VideoPlayer: ({ videoId }: { videoId: string }) => (
    <div data-testid="mock-video-player">Playing video: {videoId}</div>
  ),
}));

const mockUseVideos = useVideos as jest.MockedFunction<typeof useVideos>;

// Mock data
const mockVideos = [
  {
    id: '1',
    title: 'Training Video 1',
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

describe('VideoWidget', () => {
  const mockOnVideoSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseVideos.mockReturnValue({
      videos: mockVideos,
      isLoading: false,
      error: null,
      refreshVideos: jest.fn(),
    });
  });

  it('renders with correct title based on type', () => {
    const { rerender } = render(
      <VideoWidget type="training" onVideoSelect={mockOnVideoSelect} />,
      { wrapper }
    );
    expect(screen.getByText('Training Videos')).toBeInTheDocument();

    rerender(
      <VideoWidget type="onboarding" onVideoSelect={mockOnVideoSelect} />,
      { wrapper }
    );
    expect(screen.getByText('Onboarding Materials')).toBeInTheDocument();

    rerender(
      <VideoWidget type="field-demo" onVideoSelect={mockOnVideoSelect} />,
      { wrapper }
    );
    expect(screen.getByText('Field Demonstrations')).toBeInTheDocument();
  });

  it('shows video player when video is selected', () => {
    render(
      <VideoWidget type="training" onVideoSelect={mockOnVideoSelect} />,
      { wrapper }
    );

    // Click on a video in the list
    fireEvent.click(screen.getByText('Training Video 1'));

    // Video player should appear
    expect(screen.getByTestId('mock-video-player')).toBeInTheDocument();
    expect(screen.getByText('Playing video: 1')).toBeInTheDocument();
  });

  it('expands and collapses content', () => {
    render(
      <VideoWidget type="training" onVideoSelect={mockOnVideoSelect} />,
      { wrapper }
    );

    const expandButton = screen.getByRole('button');
    
    // Initially collapsed
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    
    // Expand
    fireEvent.click(expandButton);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    
    // Collapse
    fireEvent.click(expandButton);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('filters videos when searching', () => {
    render(
      <VideoWidget type="training" onVideoSelect={mockOnVideoSelect} />,
      { wrapper }
    );

    const searchInput = screen.getByPlaceholderText('Search videos...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(screen.getByDisplayValue('test search')).toBeInTheDocument();
  });

  it('calls onVideoSelect callback when video is selected', () => {
    render(
      <VideoWidget type="training" onVideoSelect={mockOnVideoSelect} />,
      { wrapper }
    );

    fireEvent.click(screen.getByText('Training Video 1'));
    expect(mockOnVideoSelect).toHaveBeenCalledWith('1');
  });

  it('handles loading state', () => {
    mockUseVideos.mockReturnValue({
      videos: [],
      isLoading: true,
      error: null,
      refreshVideos: jest.fn(),
    });

    render(
      <VideoWidget type="training" onVideoSelect={mockOnVideoSelect} />,
      { wrapper }
    );

    expect(screen.getAllByRole('progressbar')).toHaveLength(6);
  });

  it('handles error state', () => {
    mockUseVideos.mockReturnValue({
      videos: [],
      isLoading: false,
      error: new Error('Failed to load'),
      refreshVideos: jest.fn(),
    });

    render(
      <VideoWidget type="training" onVideoSelect={mockOnVideoSelect} />,
      { wrapper }
    );

    expect(screen.getByText(/Error loading videos/i)).toBeInTheDocument();
  });
}); 