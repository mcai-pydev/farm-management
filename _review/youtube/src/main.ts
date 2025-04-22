import { config } from 'dotenv';
import { YouTubeChannelManager } from './services/YouTubeChannelManager';
import { MonitoringService } from './monitoring/MonitoringService';
import { logger } from './utils/logger';

// Load environment variables
config();

async function bootstrap() {
  try {
    // Initialize channel manager
    const channelManager = new YouTubeChannelManager({
      apiKey: process.env.YOUTUBE_API_KEY,
      channelId: process.env.CHANNEL_ID
    });

    // Start monitoring
    const monitoring = new MonitoringService();
    await monitoring.start();

    // Initialize channel
    await channelManager.initialize();

    logger.info('YouTube Channel Manager started successfully');
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();