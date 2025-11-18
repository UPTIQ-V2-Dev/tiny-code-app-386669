# React 19 App with Authentication Implementation Plan

## Project Overview
Create a React app with authentication functionality using existing template with React 19, Vite, shadcn/ui, Tailwind v4, and React Router.

## Authentication Implementation

### 1. Login Page (`src/pages/LoginPage.tsx`)
**Purpose**: User authentication with email and password
**Features**:
- Login form with email and password fields
- Form validation using react-hook-form and zod
- Error handling and loading states
- Integration with existing auth service
- Redirect to dashboard after successful login

**Components Used**:
- `@/components/ui/button` (existing)
- `@/components/ui/card` (existing)
- `@/components/ui/input` (existing)
- `@/components/ui/label` (existing)
- `@/components/ui/form` (existing)

### 2. Dashboard Page (`src/pages/DashboardPage.tsx`)
**Purpose**: Protected main application page
**Features**:
- Welcome message with user info
- Simple counter functionality (from original app)
- Logout functionality
- Protected route requiring authentication

### 3. App Component with Routing (`src/App.tsx`)
**Purpose**: Main app with routing and authentication context
**Features**:
- React Router setup with protected routes
- Authentication state management
- Automatic redirection based on auth status

## Required Files

### New Files to Create
1. `src/pages/LoginPage.tsx` - Login form component
2. `src/pages/DashboardPage.tsx` - Main dashboard page
3. `src/hooks/useAuth.ts` - Authentication hook
4. `src/components/ProtectedRoute.tsx` - Route protection component

### Modified Files
1. `src/App.tsx` - Add routing and authentication logic
2. `src/lib/api.ts` - Implement login redirect TODOs
3. `package.json` - Add react-router-dom dependency

### Existing Files Used
- `src/services/auth.ts` (existing auth service)
- `src/types/user.ts` (existing type definitions)
- `src/lib/api.ts` (existing API utilities)
- All shadcn/ui components

## Technical Specifications

### Authentication Flow
- Login form validates credentials and calls authService.login
- Successful login stores tokens and user data in localStorage
- Protected routes check authentication status
- Automatic token refresh using existing interceptors
- Logout clears auth data and redirects to login

### State Management
- Authentication state managed through custom useAuth hook
- React Router for navigation state
- Form state managed with react-hook-form

### Form Validation
- Zod schema for login form validation
- Real-time validation feedback
- Error handling for API responses

### Routing
- Public routes: /login
- Protected routes: / (dashboard)
- Automatic redirects based on auth status

## Implementation Phases

### Phase 1: Setup Dependencies
- Install react-router-dom
- Install react-hook-form and @hookform/resolvers/zod
- Install zod for validation

### Phase 2: Authentication Infrastructure
- Create useAuth hook for auth state management
- Create ProtectedRoute component
- Update API with login redirects

### Phase 3: Login Page
- Create LoginPage component with form
- Implement form validation and submission
- Add error handling and loading states

### Phase 4: Dashboard and Routing
- Create DashboardPage component
- Update App.tsx with React Router
- Implement route protection

### Phase 5: Integration
- Test login/logout flow
- Verify token refresh works
- Test protected route access

## File Structure (Final)
```
src/
├── App.tsx (modified - routing and auth)
├── main.tsx (existing - no changes)
├── pages/
│   ├── LoginPage.tsx (new)
│   └── DashboardPage.tsx (new)
├── hooks/
│   └── useAuth.ts (new)
├── components/
│   ├── ProtectedRoute.tsx (new)
│   └── ui/ (existing components)
├── services/
│   └── auth.ts (existing - no changes)
├── lib/
│   └── api.ts (modified - implement TODOs)
└── types/
    └── user.ts (existing - no changes)
```

## Dependencies to Add
- react-router-dom
- react-hook-form
- @hookform/resolvers
- zod

## Success Criteria
- Users can login with email/password
- Authentication state persists across page refreshes
- Protected routes redirect unauthenticated users to login
- Successful login redirects to dashboard
- Logout functionality works correctly
- Token refresh works automatically
- Form validation provides helpful feedback
- Responsive design works on all devices