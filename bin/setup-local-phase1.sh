#!/bin/bash
# setup-local-phase1.sh – Bootstrap script to prep local workspace

set -e
PROJECT_DIR="$PWD"
BRANCH="ai-review/sync_to_site_008"

echo "📥 Pulling branch: $BRANCH"
git checkout -B $BRANCH origin/$BRANCH

# Run reviewed sync script
if [ -f "$PROJECT_DIR/bin/sync-dev-to-root.sh" ]; then
  echo "🔄 Syncing reviewed files to root..."
  bash $PROJECT_DIR/bin/sync-dev-to-root.sh
else
  echo "❌ Missing: bin/sync-dev-to-root.sh"
  exit 1
fi

echo "✅ Local Phase 1 setup complete. Workspace is synced with AI-reviewed files."
