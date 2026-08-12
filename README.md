# Cinematic Commerce — E-commerce Frontend

A modern, cinematic e-commerce frontend built with **React, Vite, Tailwind CSS, Zustand, and Framer Motion**.

This project explores what an e-commerce experience can look like when the focus goes beyond simply displaying products and instead considers **interaction, visual storytelling, user behavior, and application architecture**.

> **Live Demo:**
https://roaring-paprenjak-0cb196.netlify.app/
<img width="1917" height="922" alt="image" src="https://github.com/user-attachments/assets/7308a370-3f71-4fea-aa76-17107924d425" />
<img width="1903" height="871" alt="image" src="https://github.com/user-attachments/assets/73d869d7-d481-4744-8d51-3e542a69260b" />
<img width="1907" height="882" alt="image" src="https://github.com/user-attachments/assets/4700bd30-cb11-4180-9cea-453db1c00da3" />
![Uploading image.png…]()

---

## Overview

Cinematic Commerce is a frontend-first e-commerce application designed around a single-store model where an administrator manages the products and commerce experience while customers can browse, interact with products, manage their cart and wishlist, and complete the purchasing flow through an authenticated account.

The project was built with an emphasis on:

* Cinematic user interfaces
* Smooth interaction and motion
* Scalable frontend architecture
* Persistent client-side state
* Customer and admin experiences
* Product discovery
* Behavioral UI
* Responsive design
* A foundation that can later evolve into a full-stack commerce platform

---

## ✨ Features

### Customer Experience

* Product browsing and product details
* Product search and filtering
* Featured product collections
* Shopping cart
* Wishlist
* Recently viewed products
* Product quick preview
* Customer account dashboard
* Authentication flow
* Persistent authentication state
* Order history
* Checkout flow
* Onboarding experience
* Responsive interface

### 🛒 Commerce Features

* Add products to cart
* Persistent cart state
* Product quantity management
* Product pricing
* Stock management foundation
* Related product experiences
* Product recommendations
* Recently viewed products
* Wishlist management

### 🔐 Authentication & Access Control

The application includes a client-side authentication architecture using Zustand with persistent session storage.

The project also includes role-based access control foundations for:

* Customer accounts
* Administrator access
* Protected routes
* Admin-only functionality

The current implementation is intentionally frontend-first and uses simulated authentication/session persistence. The architecture is designed to evolve later into real backend authentication and database-backed ownership.

---

## 👨‍💼 Admin Experience

The application includes an administrative interface for managing the commerce experience.

Admin functionality includes:

* Admin dashboard
* Product creation
* Hero scene management
* Order management
* Order details
* Administrative commerce operations

The architecture separates customer-facing features from administrative functionality to make the application easier to extend.

---

## 🎬 Cinematic Hero Experience

One of the main focuses of the project is the homepage experience.

The hero system supports:

* Image-based scenes
* Video-based scenes
* Automatic scene transitions
* Framer Motion animations
* Cinematic overlays
* Gradients and visual effects
* Staggered content animations
* Responsive typography
* Behavioral scene prioritization

The hero experience can also take user behavior into consideration.

For example, products appearing in a user's:

* Wishlist
* Recently viewed items
* Cart

can influence which product category receives priority in the hero sequence.

This creates the foundation for a more adaptive shopping experience rather than a completely static homepage.

---

## 🧠 State Management

The project uses **Zustand** for client-side application state.

Separate stores are used for different parts of the application, including:

* Authentication
* Cart
* Products
* Wishlist
* Recently viewed products
* Toast notifications
* Hero management
* Preview state

Authentication state uses Zustand persistence so the simulated user session can survive page refreshes.

---

## 🏗️ Architecture

The project follows a feature-oriented structure while keeping shared application components separate.

```text
src/
├── app/
│   ├── App.jsx
│   └── routes.jsx
│
├── components/
│   ├── auth/
│   ├── layout/
│   └── ui/
│
├── data/
│
├── features/
│   ├── account/
│   ├── admin/
│   ├── auth/
│   ├── cart/
│   ├── home/
│   ├── orders/
│   └── product/
│
├── pages/
│   ├── Auth/
│   ├── Checkout/
│   ├── Home/
│   └── Onboarding/
│
├── store/
│
├── styles/
│
├── index.css
└── main.jsx
```

The goal of this structure is to keep business features isolated while allowing shared UI, state, routing, and styling infrastructure to remain reusable.

---

## 🛠️ Tech Stack

### Frontend

* **React 19**
* **Vite**
* **JavaScript**
* **React Router**
* **Tailwind CSS**

### State & Interaction

* **Zustand**
* **Framer Motion**
* **Lucide React**
* **Headless UI**

### 3D / Visual Foundation

* **Three.js**
* **React Three Fiber**
* **React Three Drei**

### Development

* **ESLint**
* **PostCSS**
* **Autoprefixer**
* **Git & GitHub**

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm
* Git

installed on your machine.

### Clone the repository

```bash
git clone https://github.com/Victrf/ecommerce-frontend.git
```

### Navigate into the project

```bash
cd ecommerce-frontend
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will be available through the local Vite development server.

---

## 📦 Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint across the project.

---

## 🌐 Live Demo

**Frontend:**
https://roaring-paprenjak-0cb196.netlify.app/onboarding

The onboarding route provides the entry point into the current experience.

---

## 🔮 Future Development

This project is intentionally being developed as a **frontend-first commerce platform**.

The current architecture provides a foundation for eventually introducing:

* Real backend authentication
* Database-backed users
* Persistent product data
* Real order ownership
* Payment processing
* Inventory management
* Server-side authorization
* Customer order tracking
* Product reviews and ratings
* Coupon management
* Recommendations
* Advanced analytics
* Mobile application integration

The long-term direction is to evolve the application from a frontend commerce experience into a complete web and mobile commerce platform.

---

## 🎯 Project Philosophy

This project is based on a simple idea:

> **An e-commerce application shouldn't only function. It should create an experience.**

The goal is to combine solid frontend architecture with thoughtful interaction design, animation, accessibility, experimentation, and visual storytelling.

Rather than settling for a conventional storefront, the project explores how technology can be used to create a more engaging relationship between the product, the interface, and the user.

---

## 👨‍💻 Author

**Kay**

Web & Software Developer

Building modern web experiences with a focus on frontend engineering, interaction design, and scalable application architecture.

---

## 📄 License

This project is licensed under the MIT License.
