# Deployment Guide (MongoDB Version)

This application has been updated to use **MongoDB** via Mongoose, which makes it fully compatible with serverless platforms like **Vercel** and **Netlify**.

## Prerequisites
1.  **MongoDB Atlas Account**: You need a hosted MongoDB database.
    - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    - Create a free Cluster.
    - Get your Connection String (Driver: Node.js).
    - It should look like: `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/hrms-lite?retryWrites=true&w=majority`

## Option 1: Deploy to Vercel (Recommended)

1.  Push your code to **GitHub**.
2.  Sign up/Login to [Vercel](https://vercel.com).
3.  Click **Add New...** > **Project** and import your repository.
4.  **Environment Variables**:
    - Add a new variable:
      - Name: `MONGODB_URI`
      - Value: *Your MongoDB Connection String*
5.  Click **Deploy**.

That's it! Your application (Frontend + Backend) is now live on Vercel with a persistent MongoDB database.

## Option 2: Deploy to Netlify

1.  Push to GitHub.
2.  Login to Netlify and "Import from Git".
3.  **Build Settings**:
    - Build Command: `npm run build`
    - Publish Directory: `.next` (Netlify handles Next.js automatically properly via plugin)
4.  **Environment Variables**:
    - Add `MONGODB_URI` with your connection string.
5.  Deploy.

## Option 3: Docker / Render / Railway

You can still use Render or Railway if you prefer.
- **Render/Railway**: Just add `MONGODB_URI` to your Environment Variables in their dashboard.
- **Docker**: Pass the variable when running: `docker run -e MONGODB_URI="..." ...`
