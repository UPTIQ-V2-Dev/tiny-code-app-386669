#!/bin/bash

# Install pnpm locally
npm install -g pnpm@10.14.0

# Add to PATH if needed
export PATH=$PATH:$HOME/.local/share/pnpm

# Run the required commands
pnpm install
pnpm db:generate
pnpm typecheck