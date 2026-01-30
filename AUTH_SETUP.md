# LendGuard AI Authentication System Setup

## Overview
Complete authentication system with NextAuth.js, Prisma, and PostgreSQL (Neon).

## Features
- ✅ User registration with email/password
- ✅ Secure login with bcrypt password hashing
- ✅ Password reset functionality
- ✅ Email verification system
- ✅ Protected routes with middleware
- ✅ Role-based access control (user/admin)
- ✅ User profile management
- ✅ Admin dashboard
- ✅ Session management with JWT

## Setup Instructions

### 1. Database Setup
Run the SQL migration script to create all necessary tables:

```bash
# The SQL script is in scripts/001_create_auth_tables.sql
# It will create: users, accounts, sessions, verification_tokens, password_reset_tokens
```

### 2. Environment Variables
Add the following to your environment variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Database (already configured via Neon)
DATABASE_URL=your-neon-database-url

# Optional: Email service (for production)
RESEND_API_KEY=your-resend-api-key
```

### 3. Generate NEXTAUTH_SECRET
Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

## Usage

### Authentication Pages
- **/auth/login** - User login
- **/auth/register** - New user registration
- **/auth/forgot-password** - Request password reset
- **/auth/reset-password** - Reset password with token
- **/auth/verify-email** - Verify email address

### Protected Routes
- **/dashboard/** - All dashboard pages (requires authentication)
- **/dashboard/profile** - User profile management
- **/admin** - Admin panel (requires admin role)

### API Endpoints

#### Public Endpoints
- `POST /api/auth/register` - Create new user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

#### Protected Endpoints
- `PATCH /api/user/profile` - Update user profile
- `POST /api/user/password` - Change password
- `POST /api/user/verify-email` - Verify email with token
- `POST /api/user/resend-verification` - Resend verification email

#### Admin Endpoints
- `GET /api/user/list` - List all users (paginated)
- `GET /api/user/[userId]` - Get user details
- `PATCH /api/user/[userId]` - Update user
- `DELETE /api/user/[userId]` - Delete user

## Creating First Admin User

After registering a user, manually update their role in the database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## Security Features

1. **Password Security**
   - Bcrypt hashing with salt rounds of 12
   - Minimum 8 characters required
   - Current password verification for changes

2. **Session Security**
   - JWT-based sessions
   - Automatic token refresh
   - Secure HTTP-only cookies

3. **Route Protection**
   - Middleware authentication
   - Role-based access control
   - Automatic redirects for unauthorized access

4. **Token Management**
   - Email verification tokens (24-hour expiry)
   - Password reset tokens (1-hour expiry)
   - Automatic token cleanup after use

## Email Integration (Production)

For production, integrate with an email service like Resend:

```typescript
// lib/email.ts already has placeholder functions
// Install: npm install resend
// Update the sendEmail function with actual Resend implementation
```

## Testing

1. Register a new user at `/auth/register`
2. Login at `/auth/login`
3. Access protected routes at `/dashboard`
4. Test password reset flow
5. Create admin user and access `/admin`

## Troubleshooting

### "Invalid credentials" error
- Check that the email exists in database
- Verify password is correct
- Ensure user has a password (not OAuth-only)

### Middleware redirect loop
- Verify NEXTAUTH_URL is set correctly
- Check middleware.ts matcher patterns
- Ensure callbacks in authOptions are correct

### Email verification not working
- Check that verification tokens are created
- Verify token hasn't expired (24 hours)
- Check console logs for verification URL in development
```
