# Notice Board

A complete Notice Board web application built with Next.js Pages Router, Prisma, MySQL-compatible databases, Tailwind CSS, and JavaScript.

## Features
- Create, read, update, and delete notices
- Responsive notice cards on the home page
- Urgent notices are prioritized by database ordering
- Reusable notice form for add/edit flows
- Confirmation before delete
- API routes under pages/api/notices

## Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a MySQL-compatible database and copy the example environment file:
   ```bash
   cp .env.example .env
   ```
4. Update .env with your Prisma connection string:
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE"
   ```

## Prisma migration
Run the following commands:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Run locally
```bash
npm run dev
```
Open http://localhost:3000.

## Deployment
This project is compatible with Vercel. Set the DATABASE_URL environment variable in Vercel project settings and deploy.

## AI usage
This project was built with AI-assisted implementation and can be extended with additional moderation, search, or authentication features.
