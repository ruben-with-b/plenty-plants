#!/usr/bin/env bash
# Enable the development-mode (The server must not deploy the frontend, because
# both, the frontend and the backend, are deployed on separate development
# servers).
export DEV_MODE_ENABLED="true"
# Start the development server of the server in a separate terminal.
npm run dev
