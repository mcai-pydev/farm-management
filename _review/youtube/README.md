# Farm Management YouTube Channel Integration

> Enterprise-grade YouTube channel management with social media cross-posting and analytics.

## 🚀 Quick Start

```powershell
# Install dependencies
cd d:\SIte\youtube
npm install

# Configure environment
copy .env.example .env

# Build and start
npm run build
npm start
```

## Project Structure

```
d:\SIte\youtube\
├── src\
│   ├── main.ts                           # Application entry point
│   ├── types\
│   │   └── index.ts                      # Type definitions
│   ├── models\
│   │   ├── SocialProfile.ts              # Social media credentials
│   │   ├── AutoPostSetting.ts            # Posting configurations
│   │   └── ContactPreference.ts          # User preferences
│   ├── sections\
│   │   ├── trending\
│   │   │   └── TrendingManager.ts        # Trending content handler
│   │   └── shorts\
│   │       └── ShortsManager.ts          # Shorts content manager
│   ├── services\
│   │   ├── YouTubeChannelManager.ts      # Main channel orchestrator
│   │   └── NewsletterService.ts          # Email communications
│   ├── integration\
│   │   └── SocialIntegration.ts          # Cross-platform posting
│   ├── monitoring\
│   │   └── MonitoringService.ts          # Health monitoring
│   └── utils\
│       └── logger.ts                     # Logging utility
├── __tests__\
│   ├── unit\
│   │   ├── YouTubeManager.test.ts
│   │   └── SocialIntegration.test.ts
│   ├── integration\
│   │   └── api.test.ts
│   ├── helpers\
│   │   └── dbHelper.ts
│   └── mocks\
│       └── videos.ts
├── scripts\
│   └── docs-sync.ts                      # Documentation sync tool
├── logs\                                 # Application logs
├── docs\                                 # Documentation
│   ├── SYSTEM.md
│   ├── DEV_GUIDE.md
│   └── TESTING.md
├── .env.example                         # Environment template
├── tsconfig.json                        # TypeScript config
├── jest.config.ts                       # Test configuration
└── README.md                            # This file
```

## Core Files Description

| File | Purpose |
|------|---------|
| `main.ts` | Application bootstrap and configuration |
| `YouTubeChannelManager.ts` | Core channel management logic |
| `SocialIntegration.ts` | Social media cross-posting |
| `MonitoringService.ts` | System health monitoring |
| `logger.ts` | Centralized logging utility |

## 🔒 MC Authorization

The system implements Minecraft-style authorization for enhanced security and role management:

### Configuration
```env
MC_AUTH_SECRET=your_secret_key
MC_AUTH_EXPIRY=24h
MC_AUTH_REALM=youtube_integration
```

### Authentication Flow
1. Users authenticate with Minecraft credentials
2. Server validates against Mojang authentication servers
3. JWT token issued with MC profile-based permissions
4. Token includes role and access level information

### Protected Endpoints
All YouTube management endpoints require MC authorization header:
```http
Authorization: Bearer mc_token_xxx
```

### Role-Based Access
- **Admin** [OP Level 4]
  - Full channel management
  - Analytics access
  - User management
- **Moderator** [OP Level 3]
  - Content moderation
  - Comment management
  - Analytics viewing
- **Creator** [OP Level 2]
  - Video uploads
  - Playlist management
  - Basic analytics
- **Viewer** [OP Level 1]
  - Public content access
  - Basic interactions

## 🛠️ Development

```powershell
# Start development server
npm run dev

# Run tests with watch mode
npm run test:watch

# Check test coverage
npm run test:coverage
start coverage/lcov-report/index.html
```

## 🧪 Testing

| File | Coverage |
|------|----------|
| `YouTubeManager.test.ts` | Channel manager tests |
| `SocialIntegration.test.ts` | Cross-posting tests |
| `api.test.ts` | API integration tests |

- Unit tests: `npm test`
- Integration tests: `npm run test:integration`
- Coverage report: `npm run test:coverage`

## 📚 Documentation

| File | Content |
|------|---------|
| `SYSTEM.md` | System architecture |
| `DEV_GUIDE.md` | Development guidelines |
| `TESTING.md` | Test coverage report |

## 🔐 Protocol Compliance
- All changes must be in `/SIte/youtube`
- Include filepath headers
- Run validation before commits:
  ```powershell
  npm run build
  npm test
  ```

## 🤝 Contributing
1. Fork repository
2. Create feature branch
3. Submit pull request

## 📞 Support
- Technical Issues: GitHub Issues
- Questions: Discussions Board
- Security: security@farm-management.oforha.ai