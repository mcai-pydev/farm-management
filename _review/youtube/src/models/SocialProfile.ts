import { Schema, model, Document } from 'mongoose';
import { PlatformType } from '../types';

export interface ISocialProfile extends Document {
  platformId: string;
  platformType: PlatformType;
  handle: string;
  accessToken: string;
  refreshToken?: string;
  tokenExpiry?: Date;
  isActive: boolean;
  lastSync: Date;
}

const socialProfileSchema = new Schema({
  platformId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  platformType: { 
    type: String,
    enum: ['YOUTUBE', 'TWITTER', 'INSTAGRAM'],
    required: true 
  },
  handle: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: String,
  tokenExpiry: Date,
  isActive: { type: Boolean, default: true },
  lastSync: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const SocialProfile = model<ISocialProfile>('SocialProfile', socialProfileSchema);