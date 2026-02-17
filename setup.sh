#!/bin/bash

# audiobook-ai Setup Script
# This script sets up the project for local development

echo "🚀 audiobook-ai Setup Script"
echo "============================\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)\n"

# Backend Setup
echo "📦 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "⚠️  Creating .env file..."
    cat > .env << 'EOF'
OPENROUTER_KEY=your_openrouter_api_key_here
ELEVENLABS_KEY=your_elevenlabs_api_key_here
PORT=5000
NODE_ENV=development
EOF
    echo "✅ Created backend/.env"
    echo "⚠️  IMPORTANT: Edit backend/.env and add your API keys!"
else
    echo "✅ backend/.env already exists"
fi

echo "📥 Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

# Frontend Setup
echo "\n📦 Setting up Frontend..."
cd frontend

if [ ! -f ".env.local" ]; then
    echo "⚠️  Creating .env.local file..."
    cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:5000
EOF
    echo "✅ Created frontend/.env.local"
else
    echo "✅ frontend/.env.local already exists"
fi

echo "📥 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo "\n✨ Setup Complete! ✨"
echo "===================\n"
echo "Next steps:"
echo "1. Edit backend/.env and add your API keys"
echo "   - Get OpenRouter key: https://openrouter.ai/"
echo "   - Get ElevenLabs key: https://elevenlabs.io/"
echo ""
echo "2. Start the backend:"
echo "   cd backend && node server.js"
echo ""
echo "3. In a new terminal, start the frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo "\n🎧 Happy audiobook creation! 📚"
