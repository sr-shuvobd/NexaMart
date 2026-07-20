# 🛒 NexaMart — AI-Powered E-Commerce Platform

> **Note:** Demo credentials for testing and evaluation purposes.

## 🔑 Demo Access Credentials

Below are the pre-configured credentials provided so that reviewers, evaluators, and testers can easily access and explore all features of the NexaMart platform (including Admin & Seller Dashboards):

### 🛡️ Admin Account
- **Email:** `srs@gmail.com`
- **Password:** `S1234567`
- **Role:** Administrator (Full platform access, User management, Product moderation, Analytics & System Control)

### 🏪 Seller Account
- **Email:** `shuvo@gmail.com`
- **Password:** `S1234567`
- **Role:** Seller (Add/Edit/Manage products, AI Product Description Generator, Sales analytics dashboard)

> 💡 **Notice:** Admin & Seller credentials are provided above so everyone can test and check the full functionality of the project seamlessly.

---

## 🌟 About NexaMart

**NexaMart** is a modern, production-grade, AI-powered e-commerce platform built with Next.js 14, Express.js, and MongoDB. It combines standard e-commerce features with intelligent AI capabilities to deliver an enhanced shopping and selling experience.

- **AI Product Description Generator:** Helps sellers quickly draft SEO-friendly product descriptions using Google Gemini AI.
- **AI Smart Recommendations:** Surfaces tailored product suggestions based on user behavior and intent.
- **AI Shopping Assistant:** An embedded conversational chatbot guiding users through product browsing and decisions.
- **Role-Based Dashboards:** Custom tailored portals for Buyers, Sellers, and Admins.

---

## ✨ Key Features

### 🛍️ Buyers
- Intelligent search & multi-criteria filters (price, category, ratings)
- Dynamic shopping cart & wishlist management
- Seamless checkout & real-time order tracking
- Interactive product reviews & star ratings
- AI-driven shopping assistant & personalized recommendations

### 🏪 Seller
- Comprehensive Seller Dashboard with sales analytics & graphs
- Add, update, and delete product listings
- Integrated **AI Product Description Generator**
- Inventory and stock status management

### 🛡️ Admin
- Full administrative control panel
- User management (view, promote, manage roles)
- Platform-wide product moderation & status control
- Total sales, orders, and system analytics

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Vanilla CSS
- **State & Data Fetching:** TanStack Query (React Query), Axios
- **Form Handling & Validation:** React Hook Form, Zod
- **Authentication:** Session Management & Role Access
- **Icons & Charts:** Lucide React, Recharts

### Backend
- **Runtime & Framework:** Node.js, Express.js (REST API)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Security & Logging:** Helmet, CORS, Morgan
- **AI Integration:** Google Gemini API
- **Media Storage:** Cloudinary

---

## 📁 Project Structure

```
NexaMart/
├── NexaMart/               # Next.js Frontend Application
│   ├── app/                # App Router pages & API routes
│   │   ├── (public)/       # Public routes (Home, Explore, Products, Login)
│   │   ├── admin/          # Admin dashboard & controls
│   │   ├── seller/         # Seller dashboard & management
│   │   └── dashboard/      # User/Buyer dashboard & orders
│   ├── components/         # Reusable UI & Layout components
│   ├── features/           # Feature-scoped modules
│   ├── services/           # Frontend API services
│   └── public/             # Static assets
└── NexaMart_Server/        # Express.js Backend API
    ├── src/
    │   ├── controllers/    # API Request handlers
    │   ├── routes/         # Express endpoints
    │   ├── models/         # MongoDB Mongoose models
    │   ├── middlewares/    # Auth, role-checking, error handling
    │   ├── services/       # Business logic layer
    │   └── ai/             # Gemini AI integrations
    └── vercel.json         # Backend deployment config
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **npm** or **yarn** or **pnpm**
- **MongoDB**: Local instance or MongoDB Atlas connection string

### 1. Backend Setup (`NexaMart_Server`)

```bash
cd NexaMart_Server
npm install
```

Configure your environment variables by creating a `.env` file inside `NexaMart_Server`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLIENT_URL=http://localhost:3000
```

Start backend development server:
```bash
npm run dev
```

### 2. Frontend Setup (`NexaMart`)

```bash
cd NexaMart
npm install
```

Configure your environment variables by creating a `.env.local` file inside `NexaMart`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Start frontend development server:
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📄 License

This project is created for demonstration and educational purposes.
