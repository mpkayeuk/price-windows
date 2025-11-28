# Price Glazing

A beautiful, modern sales website for Price Glazing - a commercial double glazing company.

**Tagline:** "Price, not pricey!"

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Built with Next.js 14 for optimal performance
- 📱 Fully mobile-responsive
- 🚀 Optimized for Vercel deployment
- ✨ Beautiful UI with smooth animations and transitions
- 🗄️ Vercel Neon Postgres database for projects storage
- 🔧 Admin panel for managing projects

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Vercel account with Neon Postgres database

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Vercel Neon Database:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to Storage > Create Database > Postgres
   - Create a new Postgres database
   - Copy the connection strings

3. Configure environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Add your Vercel Postgres connection strings:
     ```
     POSTGRES_URL="your-connection-string"
     POSTGRES_PRISMA_URL="your-prisma-url"
     POSTGRES_URL_NON_POOLING="your-non-pooling-url"
     ```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

The database table will be automatically created on first use.

## Deployment to Vercel

### Setting up the Database

1. **Create Vercel Postgres Database:**
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to your project
   - Go to the **Storage** tab
   - Click **Create Database** > **Postgres**
   - Choose a name and region, then create
   - Vercel will automatically add the connection strings as environment variables

2. **Environment Variables:**
   - The database connection strings are automatically added to your Vercel project
   - No manual configuration needed if you create the database through Vercel
   - For local development, copy the connection strings to `.env.local`

### Deploy Options

**Option 1: Deploy via Vercel Dashboard (Recommended)**

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click **Add New Project**
4. Import your GitHub repository
5. Vercel will automatically detect Next.js and configure build settings
6. **Create a Postgres database** (see above) before or after deployment
7. Click **Deploy**

**Option 2: Deploy via Vercel CLI**

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Create a Postgres database in the Vercel dashboard and link it to your project

**Note:** The database table will be automatically created on first API call after deployment.

## Project Structure

```
price-windows/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── WhyChooseUs.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Customization

- Update company information in the components
- Modify colors in `tailwind.config.ts`
- Add your own images to the `public/` folder
- Update contact information in the Contact and Footer components

## Build for Production

```bash
npm run build
npm start
```

## License

This project is private and proprietary.

