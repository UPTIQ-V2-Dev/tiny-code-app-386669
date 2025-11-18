# Backend Setup Guide

## Issue Resolution: pnpm ENOENT Error

The error `spawn pnpm ENOENT` occurs because pnpm is not installed in your environment. Here are several ways to fix this:

### Option 1: Install pnpm globally
```bash
npm install -g pnpm@10.14.0
```

### Option 2: Use npm instead (Recommended for this environment)
We've added npm-friendly scripts to package.json:

```bash
# Install dependencies
npm install

# Generate Prisma client  
npm run db:generate

# Run typecheck
npm run typecheck

# Complete setup in one command
npm run setup
```

### Option 3: Use npx to run pnpm temporarily
```bash
npx pnpm@10.14.0 install
npx pnpm@10.14.0 db:generate
npx pnpm@10.14.0 typecheck
```

### Option 4: Enable corepack (Node.js 16+)
```bash
corepack enable
corepack prepare pnpm@10.14.0 --activate
pnpm install
pnpm db:generate 
pnpm typecheck
```

## Project Status

✅ **The backend is fully implemented and ready to use!**

### What's Already Complete:
- Authentication system (login, register, logout, password reset, email verification)
- User management (CRUD operations with role-based access control)
- Database schema (PostgreSQL with Prisma ORM)
- MCP tools for AI agent integration
- Security middleware (JWT auth, rate limiting, input validation)
- API documentation with Swagger

### Next Steps:
1. Run one of the setup options above to install dependencies
2. Configure your database connection in `.env`
3. Run database migrations: `npm run db:push` (or `pnpm db:push`)
4. Optional: Seed the database: `npm run db:seed` (or `pnpm db:seed`)
5. Start the development server: `npm run dev:npm` (or `pnpm dev`)

The frontend can now connect to these endpoints:
- POST /auth/login
- POST /auth/register  
- GET /users
- And all other endpoints defined in the API specification

## Environment Variables Required
Create a `.env` file with:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="your-secret-key"
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USERNAME="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"
```