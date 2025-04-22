import mongoose from 'mongoose';
import { SocialProfile } from '../../../src/models/SocialProfile';
import { dbHelper } from '../../helpers/dbHelper';

describe('SocialProfile Model', () => {
  beforeAll(async () => {
    await dbHelper.connect();
  });

  afterAll(async () => {
    await dbHelper.disconnect();
  });

  beforeEach(async () => {
    await dbHelper.cleanup();
  });

  it('should create a social profile', async () => {
    const profile = await SocialProfile.create({
      platformId: 'test-123',
      platformType: 'YOUTUBE',
      handle: '@test',
      accessToken: 'token-123'
    });

    expect(profile.platformId).toBe('test-123');
    expect(profile.isActive).toBe(true);
  });

  it('should require platformId', async () => {
    await expect(SocialProfile.create({
      platformType: 'YOUTUBE',
      handle: '@test',
      accessToken: 'token-123'
    })).rejects.toThrow();
  });
});