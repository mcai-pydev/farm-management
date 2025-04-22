import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { VideoPlayer } from '../index';

// Mock YouTube IFrame API
const mockYT = {
  Player: jest.fn().mockImplementation((element, config) => ({
    destroy: jest.fn(),
    getCurrentTime: jest.fn().mockReturnValue(30),
    getDuration: jest.fn().mockReturnValue(60),
  })),
  PlayerState: {
    PLAYING: 1,
    ENDED: 0,
  },
};

describe('VideoPlayer', () => {
  beforeAll(() => {
    // Setup global YouTube API mock
    global.window.YT = mockYT;
    global.window.onYouTubeIframeAPIReady = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<VideoPlayer videoId="test-video-id" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('initializes YouTube player with correct config', () => {
    render(
      <VideoPlayer
        videoId="test-video-id"
        autoplay={true}
        controls={false}
      />
    );

    // Simulate YouTube API ready
    act(() => {
      window.onYouTubeIframeAPIReady();
    });

    expect(mockYT.Player).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        videoId: 'test-video-id',
        playerVars: expect.objectContaining({
          autoplay: 1,
          controls: 0,
        }),
      })
    );
  });

  it('calls onProgress callback during playback', () => {
    const onProgress = jest.fn();
    render(
      <VideoPlayer
        videoId="test-video-id"
        onProgress={onProgress}
      />
    );

    // Simulate YouTube API ready
    act(() => {
      window.onYouTubeIframeAPIReady();
    });

    // Simulate video playing
    const playerInstance = mockYT.Player.mock.results[0].value;
    act(() => {
      playerInstance.events.onStateChange({ data: mockYT.PlayerState.PLAYING });
    });

    // Fast-forward timers
    jest.advanceTimersByTime(1000);

    expect(onProgress).toHaveBeenCalledWith(50); // 30/60 * 100
  });

  it('calls onComplete callback when video ends', () => {
    const onComplete = jest.fn();
    render(
      <VideoPlayer
        videoId="test-video-id"
        onComplete={onComplete}
      />
    );

    // Simulate YouTube API ready
    act(() => {
      window.onYouTubeIframeAPIReady();
    });

    // Simulate video ended
    const playerInstance = mockYT.Player.mock.results[0].value;
    act(() => {
      playerInstance.events.onStateChange({ data: mockYT.PlayerState.ENDED });
    });

    expect(onComplete).toHaveBeenCalled();
  });

  it('cleans up player on unmount', () => {
    const { unmount } = render(<VideoPlayer videoId="test-video-id" />);

    // Simulate YouTube API ready
    act(() => {
      window.onYouTubeIframeAPIReady();
    });

    const playerInstance = mockYT.Player.mock.results[0].value;
    unmount();

    expect(playerInstance.destroy).toHaveBeenCalled();
  });
}); 