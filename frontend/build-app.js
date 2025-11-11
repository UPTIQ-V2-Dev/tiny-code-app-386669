#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');

console.log('Starting custom build process...');

// Step 1: TypeScript compilation
console.log('Running TypeScript compiler...');
const tsc = spawn('npx', ['tsc', '-b'], { stdio: 'inherit' });

tsc.on('close', (code) => {
    if (code !== 0) {
        console.error('TypeScript compilation failed');
        process.exit(1);
    }
    
    console.log('TypeScript compilation completed');
    
    // Step 2: Vite build
    console.log('Running Vite build...');
    const vite = spawn('npx', ['vite', 'build'], { stdio: 'inherit' });
    
    vite.on('close', (viteCode) => {
        if (viteCode !== 0) {
            console.error('Vite build failed');
            process.exit(1);
        }
        
        console.log('Build completed successfully!');
    });
});