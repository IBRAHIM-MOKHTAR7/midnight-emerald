# Midnight Emerald - Luxury Fashion E-Commerce

A production-ready full-stack clothing e-commerce web application built with Next.js, TypeScript, Prisma, and Clerk.

## 🚀 Features

- **Modern Tech Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Authentication**: Clerk for secure admin access
- **Database**: PostgreSQL with Prisma ORM
- **Image Upload**: UploadThing for drag & drop image uploads
- **WhatsApp Orders**: Direct order via WhatsApp (no payment integration)
- **Wishlist**: LocalStorage-based wishlist system
- **Coupons**: Discount code management
- **Responsive Design**: Mobile-first, fully responsive across all devices

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: Clerk
- **Image Upload**: UploadThing
- **Deployment**: Vercel

## 🛠️ Installation

### 1. Clone and Install

```bash
cd midnight-emerald
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/midnight_emerald?schema=public"

# UploadThing
UPLOADTHING_SECRET=sk_live_...
UPLOADTHING_APP_ID=...

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...

# Admin WhatsApp (for order notifications)
NEXT_PUBLIC_ADMIN_WHATSAPP=+1234567890

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Or push schema directly (for development)
npm run db:push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
midnight-emerald/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes
│   ├── api/               # API routes
│   ├── dashboard/         # Admin dashboard
│   ├── products/          # Product pages
│   ├── wishlist/          # Wishlist page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
├── actions/               # Server actions
├── hooks/                 # Custom hooks
├── lib/                   # Utilities
├── prisma/                # Database schema
└── public/                # Static assets
```

## 🎯 Key Features

### Public Pages
- **Home**: Hero section, featured products, categories
- **Products**: Search, filters, responsive grid
- **Product Detail**: Image gallery, size selector, WhatsApp order
- **Wishlist**: Save favorites locally

### Admin Dashboard
- **Dashboard**: Stats overview, inventory table
- **Products**: Create, edit, delete with image uploads
- **Coupons**: Discount code management

### Size Selection
- Sizes: XS, S, M, L, XL, XXL
- Admin defines available sizes per product
- Required selection before ordering

### WhatsApp Order Flow
1. Customer selects size & quantity
2. Optional coupon application
3. Name entry
4. Redirect to WhatsApp with pre-filled message
5. Admin receives order details

## 🚀 Deployment

### Vercel

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Database on Vercel

Use Vercel Postgres or any PostgreSQL provider:

```bash
# Vercel CLI
vercel postgres create
```

## 🔒 Security

- Clerk authentication for admin routes
- Input validation with Zod
- Secure database queries with Prisma
- Environment variables for secrets

