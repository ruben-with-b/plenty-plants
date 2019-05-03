#!/usr/bin/env bash
find . -maxdepth 1 -name ".env*" -print0 | xargs -0 -i cp {} frontend
export DEV_MODE_ENABLED="true"
start npm run dev
cd frontend
npm run serve