#!/bin/bash
# PNPM wrapper to fix permissions
chmod +x /usr/local/bin/pnpm 2>/dev/null || true
/usr/local/bin/pnpm "$@"