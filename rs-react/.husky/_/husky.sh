#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run format:fix
npm run lint
