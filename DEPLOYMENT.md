# 🚀 Deployment Guide for audiobook-ai

## Overview
This guide covers deploying the audiobook-ai application to production using Vercel (frontend) and Render (backend).

## Prerequisites
- GitHub account with the audiobook-ai repository
- Vercel account (https://vercel.com)
- Render account (https://render.com)
- OpenRouter API key (https://openrouter.ai)
- ElevenLabs API key (https://elevenlabs.io)
- ElevenLabs Voice ID (e.g., 21m00Tcm4TlvDq8ikWAM)

## Backend Deployment (Render)

### Step 1: Prepare Backend
1. Navigate to https://render.com and sign up
2. Click "New +" and select "Web Service"
3. Connect your GitHub account
4. Select the `audiobook-ai` repository

### Step 2: Configure Backend Service
- **Name**: audiobook-ai-backend
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `node backend/server.js`
- **Root Directory**: `backend`

### Step 3: Set Environment Variables
Add these environment variables in Render dashboard:
```
OPENROUTER_KEY=<your-openrouter-api-key>
ELEVENLABS_KEY=<your-elevenlabs-api-key>
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
NODE_ENV=production
```

### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Copy the service URL (e.g., https://audiobook-ai-backend.onrender.com)

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
1. Visit https://vercel.com and sign up
2. Click "Add New..." and select "Project"
3. Select "GitHub" and authorize Vercel
4. Select the `audiobook-ai` repository

### Step 2: Configure Frontend
- **Project Name**: audiobook-ai-frontend
- **Framework**: Next.js
- **Root Directory**: `frontend`

### Step 3: Set Environment Variables
Add this variable:
```
NEXT_PUBLIC_API_URL=<your-backend-url>
# Example: https://audiobook-ai-backend.onrender.com
```

### Step 4: Deploy
- Click "Deploy"
- Wait for build to complete
- Your app will be live at https://audiobook-ai-frontend.vercel.app

## Post-Deployment Verification

1. **Test Backend API**:
   ```bash
   curl -X POST https://audiobook-ai-backend.onrender.com/api/generate \
     -H "Content-Type: application/json" \
     -d '{"topic": "Test Topic"}'
   ```

2. **Test Frontend**:
   - Visit https://audiobook-ai-frontend.vercel.app
   - Enter a topic and click "Generate Audiobook"
   - Verify the API response appears in the UI

## Code Changes Made

### Backend Improvements
✅ Fixed `/generate` endpoint to `/api/generate` for consistency  
✅ Added environment variable support for ElevenLabs Voice ID  
✅ Improved error handling with detailed error messages  
✅ Added dotenv package for environment variable management  
✅ Enhanced response structure with metadata (wordCount, chapters, voice, language)

### Environment Variables Required

**Backend (.env)**:
```
OPENROUTER_KEY=<your-key>
ELEVENLABS_KEY=<your-key>
ELEVENLABS_VOICE_ID=<voice-id>
PORT=5000
NODE_ENV=production
```

**Frontend (.env.local)**:
```
NEXT_PUBLIC_API_URL=<backend-url>
```

## Troubleshooting

### Backend Won't Start
- Check all environment variables are set correctly
- Verify Node.js version compatibility
- Check Render logs for detailed error messages

### Frontend Can't Connect to Backend
- Verify NEXT_PUBLIC_API_URL is set correctly
- Check backend service is running
- Look for CORS errors in browser console

### API Calls Failing
- Verify OpenRouter and ElevenLabs API keys are valid
- Check API quota hasn't been exceeded
- Review backend logs in Render dashboard

## Rollback Procedure

1. **Render**: Go to "Deployments" tab and select a previous deployment
2. **Vercel**: Go to "Deployments" tab and click "Redeploy" on a previous version

## Performance Monitoring

- **Render**: Check "Metrics" tab for resource usage
- **Vercel**: Check "Analytics" for performance data
- Monitor API usage on OpenRouter and ElevenLabs dashboards

## Cost Optimization

- Use Render's free tier or start with $7/month
- Vercel offers generous free tier
- Monitor OpenRouter and ElevenLabs usage
- Set up alerts for API quota usage

## Security Best Practices

1. Never commit `.env` files to GitHub
2. Use Render and Vercel's environment variable management
3. Rotate API keys regularly
4. Enable HTTPS (automatic with both services)
5. Monitor access logs for suspicious activity

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [OpenRouter API Docs](https://openrouter.ai/docs)
- [ElevenLabs API Docs](https://elevenlabs.io/docs)

## Support

If you encounter issues:
1. Check the logs in Render and Vercel dashboards
2. Review this deployment guide
3. Check API provider status pages
4. Open an issue on GitHub with error details
