# Next.js Frontend Starter

A modern, production-ready Next.js starter template with TypeScript, React Query and Shadcn UI.

## 🚀 Features

- ⚡ Next.js 15+ with App Router
- 🎨 Shadcn UI components
- 🌓 Light/Dark mode with `next-themes`
- 🧭 Search params management with `nuqs`
- 🔄 State management with `zustand`
- 🔄 Data fetching with `@tanstack/react-query`
- 📝 Form handling with `react-hook-form` and `zod`
- 🎯 TypeScript first
- 🎨 Tailwind CSS with CSS variables
- 🛠️ Code quality tools: ESLint, Prettier, Husky
- 📊 Analytics: Google Analytics 4 (GA4) and Google Tag Manager (GTM) integration

## 📦 Project Structure

```
app/
├── (auth)/               # Authentication routes
│   ├── login/
│   ├── register/
│   └── reset-password/
│   └── verify-account/
├── (main)/              # Main application routes
│   └── page.tsx
├── error.tsx            # Error boundary
├── global-error.tsx     # Global error boundary
└── not-found.tsx        # 404 page

components/
├── ui/                 # UI components (shadcn/ui)
├── forms/              # Form components
├── header/             # Header components
├── footer/             # Footer components

lib/
├── config/            # App configuration
├── hooks/             # Custom React hooks
├── services/          # API services
└── stores/            # State management
```

## 🛠️ Tech Stack

### State Management
- **Zustand**: Lightweight state management
- **NuQS**: For URL state management and synchronization
- **Tanstack Query**: Data fetching and cache management

### Form Handling & Validation
- **React Hook Form**: Performant form handling
- **Zod**: Type-safe schema validation

### UI Components
- **Shadcn/ui**: Beautifully designed components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Clean and consistent icons

### API & Data Fetching
- **Axios**: Promise-based HTTP client
- **Tanstack Query**: Data synchronization and caching

### Styling & Theming
- **Tailwind CSS**: Utility-first CSS framework
- **next-themes**: For theme management (light/dark mode)
- **class-variance-authority**: For building type-safe UI components

### Development Tools
- **TypeScript**: Static type checking
- **ESLint**: JavaScript/TypeScript linter
- **Prettier**: Code formatter
- **Husky**: Git hooks

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nextjs-starter.git
   cd nextjs-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Update the environment variables as needed
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📊 Analytics

This project comes pre-configured with Google Analytics 4 (GA4) and Google Tag Manager (GTM) integration.

### Setup

1. Add your GA4 and GTM IDs to the environment variables:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
   ```

2. The tracking service (`lib/services/track.service.ts`) provides utility functions for tracking events:
   ```typescript
   import { trackEvent } from '@/lib/services/track.service';
   
   // Track a custom event
   trackEvent('button_click', { button_name: 'cta' });
   ```

3. Page views are automatically tracked via the root layout component.

## 🛠️ Scripts

- `dev`: Start development server
- `build`: Create production build
- `start`: Start production server
- `lint`: Run ESLint
- `format`: Format code with Prettier
- `prepare`: Set up Git hooks

## 🔧 Configuration

- `lib/config` for app configuration
  - `google.config.ts` - Google Analytics and Tag Manager configuration
- `components.json` for Shadcn UI configuration
- `next.config.js` for Next.js configuration
- `tsconfig.json` for TypeScript settings
