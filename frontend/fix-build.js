#!/usr/bin/env node

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing pnpm issue and building application...');

function runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        console.log(`Running: ${command} ${args.join(' ')}`);
        const child = spawn(command, args, { 
            stdio: 'inherit',
            ...options
        });
        
        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with exit code ${code}`));
            }
        });
        
        child.on('error', (error) => {
            reject(error);
        });
    });
}

async function main() {
    try {
        // Check if pnpm exists and try to fix permissions
        try {
            execSync('chmod +x /usr/local/bin/pnpm 2>/dev/null || true', { stdio: 'inherit' });
            console.log('✅ Fixed pnpm permissions');
        } catch (error) {
            console.log('⚠️  Could not fix pnpm permissions, continuing with npx...');
        }

        // Step 1: Install dependencies with npm if needed
        if (!fs.existsSync('node_modules')) {
            console.log('📦 Installing dependencies...');
            await runCommand('npm', ['install']);
        }

        // Step 2: TypeScript compilation
        console.log('🔨 Running TypeScript compiler...');
        await runCommand('npx', ['tsc', '-b']);
        
        // Step 3: Vite build
        console.log('📦 Running Vite build...');
        await runCommand('npx', ['vite', 'build']);
        
        console.log('🎉 Build completed successfully!');
        
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    }
}

main();