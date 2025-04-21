#!/bin/bash
# sync-dev-to-root.sh: sync reviewed folders to root

SOURCE_FOLDERS=(
  "./_review/youtube"
  "./_review/docs"
  "./_review/tests"
)

for folder in "${SOURCE_FOLDERS[@]}"
do
  cp -r "$folder/"* "./"
done

echo "✅ Developer content synced to ./ root"
