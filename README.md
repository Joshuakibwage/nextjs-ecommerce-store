# Next.js E-commerce Store

A modern and polished e-commerce storefront built with Next.js, Supabase, and Tailwind CSS. This repository demonstrates a full-featured shopping experience with product browsing, categories, cart management, checkout flow, user authentication, and account management.

---

## ✨ Key Features

- Clean, responsive storefront UX with product cards, product detail pages, and category browsing
- Persistent shopping cart and wishlist powered by Zustand
- Supabase-backed authentication and secure sign-in flow
- Checkout and payment verification screens for a complete purchase experience
- Dark/light theme support using `next-themes`
- Data fetching and client caching with `@tanstack/react-query`
- Accessible UI components built with `radix-ui` and `shadcn`
- Cloudinary integration for product images via `next-cloudinary`

---

## 🧱 Project Structure

- `app/` - Main application routes, pages, and nested layouts
- `components/` - UI components, layout sections, and providers
- `components/ui/` - Shared design system components (buttons, cards, inputs, dropdowns)
- `lib/` - Query helpers, utilities, and Supabase clients
- `store/` - Client-side state management for cart, checkout, and wishlist
- `types/` - Shared TypeScript types
- `constants/` - Static values and configuration used across the app

---

## 🚀 Tech Stack

- `next` 16
- `react` 19
- `typescript`
- `tailwindcss` 4
- `@supabase/supabase-js` and `@supabase/ssr`
- `@tanstack/react-query`
- `zod` for schema validation
- `zustand` for local state management
- `lucide-react` for iconography
- `clsx` + `tailwind-merge` for class composition
- `radix-ui` + `shadcn` for accessible UI primitives

---

## 🛠️ Setup & Run

1. Clone the repository:

```bash
git clone https://github.com/Joshuakibwage/nextjs-ecommerce-store.git
cd nextjs-ecommerce-store
```

2. Install dependencies:

```bash
npm install
```

3. Create your environment variables and configure Supabase credentials.

4. Start the development server:

```bash
npm run dev
```

5. Open your browser at:

```text
http://localhost:3000
```

---

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production assets
- `npm run start` - Run the production server
- `npm run lint` - Run ESLint checks

---

## 🎯 Why this repo stands out

This store is built with modern Next.js conventions and user experience in mind. It combines server-rendered and client-rendered patterns, integrates strong UI foundations, and offers a modular structure that is easy to extend for additional features like checkout payment gateways, product search, or order history.

---

## 📦 Notes

- `next-cloudinary` handles image uploads and optimization for product visuals.
- `next-themes` enables theme toggling between light and dark modes.
- Supabase is the backend of choice for authentication, session handling, and server-side data access.

---

## 💡 Recommended Improvements

- Add fully connected payment provider integration
- Enhance search and filter functionality
- Add admin dashboard for managing inventory
- Add tests for critical flows and component behavior

---

