#!/usr/bin/env bash
# In order to set the environment variables in the server as well as in the
# frontend, copy all .env-files from the <project root> to frontend.
find . -maxdepth 1 -name ".env*" -print0 | xargs -0 -i cp {} frontend
# Enable the development-mode (The server must not deploy the frontend, because
# both, the frontend and the backend, are deployed on separate development
# servers).
export DEV_MODE_ENABLED="true"
# Start the development server of the frontend in a separate terminal.
cd frontend
npm run serve