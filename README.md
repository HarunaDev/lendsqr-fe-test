# User Management Dashboard (Frontend Assessment)

A modern, responsive **User Management Dashboard** built with **React, TypeScript, SCSS, and Vite**, designed to display detailed user information, manage user status, and demonstrate scalable frontend architecture and clean UI patterns.

This project was developed as part of a **frontend engineering assessment**, with a strong focus on responsiveness, component structure, state handling, and maintainable styling.

---

## ✨ Features

- 📋 User list and detailed user profile view  
- 👤 Comprehensive user details (personal info, bank details, guarantors, socials, etc.)  
- 🔄 Tab-based navigation for user data sections  
- 🚦 User status management (Activate / Blacklist)  
- 💾 Local storage caching for user data  
- 📱 Fully responsive layout (desktop, tablet, mobile)  
- 🎨 Clean, accessible UI with reusable SCSS patterns  
- 🧪 Testing setup with **Vitest** and **Testing Library**

---

## 🛠️ Tech Stack

- **React** – Component-based UI  
- **TypeScript** – Type safety and scalability  
- **Vite** – Fast development and build tooling  
- **SCSS (Sass)** – Modular, maintainable styling  
- **React Router** – Client-side routing  
- **Vitest** – Unit testing  
- **Testing Library** – Component testing utilities  

---

## 📂 Project Structure

```bash
src/
├── components/ # Reusable UI components
├── pages/ # Page-level components (UserDetails, Users, etc.)
├── services/ # Mock API & localStorage utilities
├── styles/ # Global variables, mixins, base styles
├── types/ # TypeScript interfaces & types
├── test/ # Test setup and configuration
├── App.tsx
├── main.tsx
```


## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/HarunaDev/lendsqr-fe-test.git
cd lendsqr-fe-test
npm install
npm run dev
```

### Testing

```bash
npm run test
```