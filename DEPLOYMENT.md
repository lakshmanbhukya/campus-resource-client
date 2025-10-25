# Deployment Guide

## Netlify Deployment

### 1. Build Settings
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18

### 2. Environment Variables
Set in Netlify dashboard under Site settings > Environment variables:
```
VITE_API_BASE_URL=https://your-backend-url.herokuapp.com/api
```

### 3. Deploy Steps
1. Connect your GitHub repository to Netlify
2. Set build settings as above
3. Add environment variable
4. Deploy

### 4. Custom Domain (Optional)
- Add custom domain in Netlify dashboard
- Update DNS settings as instructed

## Local Development
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
npm run preview
```