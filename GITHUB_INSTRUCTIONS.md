# How to Push Code to GitHub

Follow these steps to upload your project to GitHub.

## 1. Create a Repository on GitHub
1.  Go to [GitHub.com](https://github.com/new).
2.  Log in and create a **New Repository**.
3.  Name it `hrms-lite`.
4.  **Do not** initialize with checks (README, .gitignore, License) since you already have them locally.
5.  Click **Create repository**.

## 2. Initialize Git Locally (Terminal)
Open your terminal in the project folder (`c:\application-HRMS-LITE\hrms-lite`) and run these commands one by one:

```bash
# 1. Initialize Git
git init

# 2. Add all files to staging
 git add.

# 3. Commit your changes
git commit -m "Initial commit - HRMS Lite with MongoDB"

# 4. Rename branch to main (optional but recommended)
git branch -M main

# 5. Link to your GitHub repository
git remote add origin https://github.com/Pakhi005/hrms-lite.git

# 6. Push the code
git push -u origin main
```

## 3. Deployment
Once the code is on GitHub, you can go to **Vercel** or **Render**, select "Import from GitHub", and choose this `hrms-lite` repository.

## Safety Check
Your `.gitignore` file correctly excludes:
- `node_modules` (Heavy dependencies)
- `.env` (Secrets/API Keys - **Never push this!**)
