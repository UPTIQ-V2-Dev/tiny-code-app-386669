#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing pnpm ENOENT error...\n');

async function fixPnpmIssue() {
  try {
    // Method 1: Try to enable corepack if available
    console.log('📦 Attempting to enable corepack...');
    try {
      execSync('corepack enable', { stdio: 'inherit' });
      execSync('corepack prepare pnpm@10.14.0 --activate', { stdio: 'inherit' });
      console.log('✅ Corepack enabled successfully');
      return 'corepack';
    } catch (corepackError) {
      console.log('❌ Corepack method failed, trying npm install...');
    }

    // Method 2: Install pnpm globally using npm
    console.log('📦 Installing pnpm globally with npm...');
    try {
      execSync('npm install -g pnpm@10.14.0', { stdio: 'inherit' });
      console.log('✅ pnpm installed globally');
      return 'npm-global';
    } catch (npmError) {
      console.log('❌ Global npm install failed, trying local install...');
    }

    // Method 3: Use npm and modify scripts
    console.log('📦 Falling back to npm with modified package.json...');
    
    // Read current package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Backup original
    fs.writeFileSync(packageJsonPath + '.backup', JSON.stringify(packageJson, null, 2));
    
    // Replace pnpm with npm in scripts
    const modifiedScripts = {};
    Object.keys(packageJson.scripts).forEach(key => {
      modifiedScripts[key] = packageJson.scripts[key].replace(/pnpm/g, 'npm');
    });
    
    packageJson.scripts = {
      ...modifiedScripts,
      'install:safe': 'npm install',
      'db:generate:safe': 'npx prisma generate',
      'typecheck:safe': 'npx tsc --noEmit',
      'setup:safe': 'npm install && npx prisma generate && npx tsc --noEmit'
    };
    
    // Write modified package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Package.json modified for npm compatibility');
    
    return 'npm-fallback';
    
  } catch (error) {
    console.error('❌ All methods failed:', error.message);
    throw error;
  }
}

async function runSetup(method) {
  console.log(`\n🚀 Running setup with method: ${method}`);
  
  try {
    if (method === 'npm-fallback') {
      console.log('📦 Installing dependencies with npm...');
      execSync('npm install', { stdio: 'inherit' });
      
      console.log('🔄 Generating Prisma client...');
      execSync('npx prisma generate', { stdio: 'inherit' });
      
      console.log('✅ Running TypeScript typecheck...');
      execSync('npx tsc --noEmit', { stdio: 'inherit' });
      
    } else {
      console.log('📦 Installing dependencies with pnpm...');
      execSync('pnpm install', { stdio: 'inherit' });
      
      console.log('🔄 Generating Prisma client...');
      execSync('pnpm db:generate', { stdio: 'inherit' });
      
      console.log('✅ Running TypeScript typecheck...');
      execSync('pnpm typecheck', { stdio: 'inherit' });
    }
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Configure your .env file with database credentials');
    console.log('2. Run database migrations: npm run db:push (or pnpm db:push)');
    console.log('3. Start development server: npm run dev:npm (or pnpm dev)');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    throw error;
  }
}

// Main execution
fixPnpmIssue()
  .then(method => runSetup(method))
  .catch(error => {
    console.error('\n💥 Fix failed:', error.message);
    console.log('\n🔧 Manual fix options:');
    console.log('1. Run: npm install -g pnpm@10.14.0');
    console.log('2. Or use: npm run setup:safe');
    console.log('3. Or run commands individually with npm/npx');
    process.exit(1);
  });