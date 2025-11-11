#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Try to fix pnpm permissions
const pnpmPath = '/usr/local/bin/pnpm';

try {
  // Check if pnpm exists
  if (fs.existsSync(pnpmPath)) {
    // Get current permissions
    const stats = fs.statSync(pnpmPath);
    
    // Add execute permissions (755)
    fs.chmodSync(pnpmPath, 0o755);
    
    console.log('PNPM permissions fixed successfully');
  } else {
    console.log('PNPM binary not found at expected location');
  }
} catch (error) {
  console.log('Could not fix permissions:', error.message);
}