import { TrendingManager } from '../sections/trending';
import { ShortsManager } from '../sections/shorts';
import { SocialIntegration } from '../integration/SocialIntegration';
import { logger } from '../utils/logger';

interface ManagerConfig {
  apiKey: string;
  channelId: string;
}

export class YouTubeChannelManager {
  private trendingManager: TrendingManager;
  private shortsManager: ShortsManager;
  private socialIntegration: SocialIntegration;

  constructor(private config: ManagerConfig) {
    this.validateConfig();
    this.initializeManagers();
  }

  private validateConfig() {
    if (!this.config.apiKey || !this.config.channelId) {
      throw new Error('Invalid configuration: apiKey and channelId are required');
    }
  }

  private initializeManagers() {
    this.trendingManager = new TrendingManager();
    this.shortsManager = new ShortsManager();
    this.socialIntegration = new SocialIntegration();
  }

  public async initialize(): Promise<void> {
    try {
      await this.trendingManager.initialize();
      await this.shortsManager.initialize();
      await this.socialIntegration.initialize();
      
      logger.info('Channel manager initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize channel manager:', error);
      throw error;
    }
  }
}