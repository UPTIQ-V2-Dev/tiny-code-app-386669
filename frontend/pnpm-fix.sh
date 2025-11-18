#!/bin/bash

echo "🔧 Fixing pnpm ENOENT issue..."

# Try to fix permissions first
chmod +x /usr/local/bin/pnpm 2>/dev/null || true

# Check if pnpm exists
if command -v pnpm &> /dev/null; then
    echo "✅ pnpm found, running build..."
    pnpm build
elif command -v npm &> /dev/null; then
    echo "⚠️  pnpm not found, using npm and npx instead..."
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing dependencies with npm..."
        npm install
    fi
    
    # Run the build commands directly
    echo "🔨 Running TypeScript compiler..."
    npx tsc -b
    
    echo "📦 Running Vite build..."
    npx vite build
    
    echo "🎉 Build completed successfully!"
else
    echo "❌ Neither pnpm nor npm found!"
    exit 1
fi