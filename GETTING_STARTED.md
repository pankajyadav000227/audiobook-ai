# 🚀 Getting Started with audiobook-ai

This guide will help you set up and run the audiobook-ai project locally.

## Prerequisites

Before you start, make sure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended)

## Step 1: Clone the Repository

```bash
git clone https://github.com/pankajyadav000227/audiobook-ai.git
cd audiobook-ai
```

## Step 2: Get API Keys

### Get OpenRouter API Key (for ChatGPT access)

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up for a free account
3. Go to "Keys" section
4. Create a new API key
5. Copy the key (you'll use this as `OPENROUTER_KEY`)

### Get ElevenLabs API Key (for Text-to-Speech)

1. Visit [ElevenLabs.io](https://elevenlabs.io/)
2. Sign up for a free account
3. Go to API section
4. Copy your API key (you'll use this as `ELEVENLABS_KEY`)

## Step 3: Setup Backend

### 3.1 Navigate to Backend Directory

```bash
cd backend
```

### 3.2 Install Dependencies

```bash
npm install
```

### 3.3 Create Environment File

Create a `.env` file in the `backend` directory:

```env
OPENROUTER_KEY=your_openrouter_api_key_here
ELEVENLABS_KEY=your_elevenlabs_api_key_here
PORT=5000
NODE_ENV=development
```

**Replace:**
- `your_openrouter_api_key_here` - with your OpenRouter API key
- `your_elevenlabs_api_key_here` - with your ElevenLabs API key

### 3.4 Start Backend Server

```bash
node server.js
```

**Expected Output:**
```
Server running on port 5000
Backend is ready!
```

✅ **Backend is now running on** `http://localhost:5000`

Keep this terminal open. Do NOT close it.

## Step 4: Setup Frontend

### 4.1 Open New Terminal

Open a **new terminal window** (keep backend running in the first one).

### 4.2 Navigate to Frontend Directory

```bash
cd audiobook-ai/frontend
```

### 4.3 Install Dependencies

```bash
npm install
```

This will install React, Next.js, Tailwind CSS, and other required packages.

### 4.4 Create Environment File

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4.5 Start Frontend Development Server

```bash
npm run dev
```

**Expected Output:**
```
▲ Next.js 14.0.0
✓ compiled successfully
> Ready in 1234ms
```

✅ **Frontend is now running on** `http://localhost:3000`

## Step 5: Open in Browser

1. Open your web browser
2. Navigate to: **http://localhost:3000**
3. You should see the AudioBook AI interface

## Step 6: Generate Your First Audiobook

1. Enter a topic you're interested in (e.g., "History of Artificial Intelligence")
2. Click "Generate Audiobook" button
3. Wait while the AI:
   - Generates engaging content
   - Converts text to natural speech
4. Listen to your audiobook using the built-in player

## Troubleshooting

### Backend won't start

- **Error: Cannot find module 'express'**
  - Solution: Run `npm install` in the backend directory
  - Make sure you're in the backend folder: `cd backend`

- **Error: Port 5000 is already in use**
  - Solution: Change PORT in .env file to another port (e.g., 5001)
  - Or kill the process using port 5000

- **Error: Invalid API keys**
  - Solution: Double-check your API keys in the .env file
  - Make sure there are no extra spaces

### Frontend won't start

- **Error: Cannot find module 'next'**
  - Solution: Run `npm install` in the frontend directory
  - Make sure you're in the frontend folder: `cd frontend`

- **Error: Backend connection failed**
  - Solution: Verify backend is running on http://localhost:5000
  - Check NEXT_PUBLIC_API_URL in .env.local

### No audio is generated

- Check if your ElevenLabs API key is valid
- Verify you have remaining character quota on ElevenLabs
- Check browser console for error messages (F12)

## Project Structure

```
audiobook-ai/
├── backend/                    # Express.js server
│   ├── server.js             # Main server file
│   ├── package.json          # Backend dependencies
│   └── .env                  # Backend environment variables
├── frontend/                  # Next.js application
│   ├── pages/
│   │   └── index.js          # Main UI component
│   ├── public/               # Static files
│   ├── package.json          # Frontend dependencies
│   ├── next.config.js        # Next.js configuration
│   ├── tailwind.config.js    # Tailwind CSS config
│   └── .env.local            # Frontend environment variables
├── README.md                  # Project documentation
└── GETTING_STARTED.md        # This file
```

## Available Scripts

### Backend

```bash
cd backend
node server.js              # Start server
```

### Frontend

```bash
cd frontend
npm run dev                 # Start development server
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run linting
```

## Next Steps

- 🎨 Customize the UI in `frontend/pages/index.js`
- 🔧 Modify backend logic in `backend/server.js`
- 🚀 Deploy to [Render](https://render.com/) and [Vercel](https://vercel.com/)
- 📚 Read the main [README.md](./README.md) for production improvements

## Need Help?

- Check the troubleshooting section above
- Review the [README.md](./README.md) for more details
- Open an issue on GitHub

## API Usage Tips

### OpenRouter (ChatGPT)
- Free tier: Limited requests
- Fast response time
- Model: gpt-4o-mini (cost-effective)

### ElevenLabs (Text-to-Speech)
- Free tier: 10,000 characters/month
- High-quality voices
- Multiple voice options available

## Deployment

Ready to deploy? Check out:
- [Deploy Backend to Render](https://render.com/docs/deploy-node-express-app)
- [Deploy Frontend to Vercel](https://vercel.com/docs/concepts/next.js/overview)

Happy creating! 🎧📚
