#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('Installing pnpm...');
  
  // Try to install pnpm globally
  execSync('npm install -g pnpm@10.14.0', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('pnpm installed successfully');
  
  // Try to run pnpm commands
  console.log('Installing dependencies...');
  execSync('pnpm install', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('Generating Prisma client...');
  execSync('pnpm db:generate', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('Running typecheck...');
  execSync('pnpm typecheck', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('All commands completed successfully!');
  
} catch (error) {
  console.error('Error during setup:', error.message);
  
  // Fall back to using npm directly with modified package.json
  console.log('Falling back to npm...');
  
  try {
    console.log('Installing dependencies with npm...');
    execSync('npm install', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('Generating Prisma client...');
    execSync('npx prisma generate', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('Running typecheck...');
    execSync('npx tsc --noEmit', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('Fallback completed successfully!');
  } catch (fallbackError) {
    console.error('Fallback also failed:', fallbackError.message);
    process.exit(1);
  }
}