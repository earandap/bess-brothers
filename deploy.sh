#!/usr/bin/env bash
set -euo pipefail

BUCKET="s3://www.bestbrothers.com"
DIST_DIR="dist"
AWS_PROFILE="--profile bessbrothers"

# Build
echo "Building production bundle..."
npm run build

# Sync to S3
echo "Syncing to $BUCKET..."
aws s3 sync "$DIST_DIR" "$BUCKET" --delete $AWS_PROFILE

# Invalidate CloudFront cache
DISTRIBUTION_ID="EXA7O5GVZSD8Z"

if [ -n "$DISTRIBUTION_ID" ]; then
  echo "Invalidating CloudFront distribution $DISTRIBUTION_ID..."
  aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/*" $AWS_PROFILE
else
  echo "Warning: Could not find CloudFront distribution. Skipping invalidation."
fi

echo "Deploy complete."
