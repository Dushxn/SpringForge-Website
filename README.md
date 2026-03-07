# SpringForge Website

> **An Intelligent Spring Boot Development Ecosystem** — Official distribution website for the SpringForge IntelliJ IDEA plugin.

SpringForge is a comprehensive intelligent development platform powered by Machine Learning, RAG-based debugging, and architecture-aware code generation, featuring four core AI components for modern Spring Boot development.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Features](#features)
- [Development](#development)
- [Deployment](#deployment)

## 🎯 Overview

This repository contains the official website for SpringForge, a distribution platform that allows administrators to upload and manage IntelliJ IDEA plugin releases. The site features:

- **Public Landing Page** - Showcases the four SpringForge AI components
- **Plugin Distribution** - Download system for the latest plugin releases
- **Admin Dashboard** - Secure upload interface for managing plugin versions (up to 1GB)
- **PostgreSQL Storage** - Binary storage for plugin files with version tracking

## 🏗️ Architecture

The project consists of two main components:

### Frontend (Next.js)
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Port**: 3000
- **Features**: Server-side rendering, optimized for SEO

### Backend (NestJS)
- **Framework**: NestJS
- **Database**: PostgreSQL
- **Port**: 4000
- **Features**: RESTful API, file upload handling (up to 1GB), basic authentication

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 19** - UI library

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL driver
- **Multer** - File upload middleware
- **dotenv** - Environment configuration

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (v22 recommended)
- **npm** or **yarn**
- **PostgreSQL** 12+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/springforgeecosystem-prog/SpringForge-Website.git
   cd SpringForge-Website
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Set up PostgreSQL Database**
   ```sql
   CREATE DATABASE springforge_static_web;
   ```

5. **Configure Environment Variables**
   
   See [Configuration](#configuration) section below.

### Running the Application

**Backend:**
```bash
cd Backend
npm run start:dev
```
Server will start on http://localhost:4000

**Frontend:**
```bash
cd Frontend
npm run dev
```
Site will be available at http://localhost:3000

## ⚙️ Configuration

### Backend Environment Variables

Create `Backend/.env`:

```env
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# Server Configuration
PORT=4000

# PostgreSQL Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=springforge_static_web
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_db_password
```

### Frontend Environment Variables

Create `Frontend/.env`:

```env
# Backend API URL (server-side)
API_URL=http://localhost:4000

# Backend API URL (client-side)
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Note**: `NEXT_PUBLIC_API_URL` is used for client-side uploads to bypass Next.js's 10MB proxy limit.

## 📁 Project Structure

```
SpringForge-Website/
├── Backend/
│   ├── src/
│   │   ├── admin/              # Admin upload functionality
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.service.ts
│   │   │   ├── admin.module.ts
│   │   │   └── basic-auth.guard.ts
│   │   ├── plugin/             # Plugin retrieval endpoints
│   │   │   ├── plugin.controller.ts
│   │   │   ├── plugin.service.ts
│   │   │   └── plugin.module.ts
│   │   ├── database/           # PostgreSQL integration
│   │   │   ├── database.service.ts
│   │   │   └── database.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   └── package.json
│
├── Frontend/
│   ├── app/
│   │   ├── admin/              # Admin upload page
│   │   │   └── page.tsx
│   │   ├── page.tsx            # Public landing page
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── public/
│   │   └── logo.png
│   ├── middleware.ts           # Request handling
│   ├── next.config.ts
│   ├── .env
│   └── package.json
│
└── README.md
```

## ✨ Features

### Public Features
- **Landing Page** - Showcases four SpringForge AI components
- **Plugin Download** - Latest version download system
- **Version Information** - Displays current release version and date
- **Installation Guide** - Step-by-step plugin installation instructions

### Admin Features
- **Secure Upload** - Basic authentication protected
- **Large File Support** - Handles plugin files up to 1GB
- **Version Management** - Automatic version tracking
- **File Validation** - Accepts only .zip files
- **Database Storage** - Binary storage in PostgreSQL

### Four SpringForge AI Components

1. **🏗️ Architecture-Aware Code Generation**
   - Intelligent project scaffolding powered by ML and LLMs
   - Analyzes existing structures (Layered, MVC, Clean)
   - Dynamic Prompt Construction for structurally valid code

2. **🔍 RAG-Based Runtime Error Analysis**
   - AI-powered debugging without leaving IDE
   - >75% precision in documentation retrieval
   - >90% fix accuracy

3. **🎯 AI-Driven Code Quality Assurance**
   - Dual-Engine AI Architecture
   - Anti-Pattern Classifier
   - Quality Score Regression (0–100)

4. **🚀 Intelligent CI/CD & Infrastructure Assistant**
   - Secure DevOps artifact generation
   - Claude + MCP integration
   - Multi-layer validation (Hadolint, KubeLinter)

## 🔧 Development

### Backend Development

```bash
cd Backend
npm run start:dev    # Development with hot-reload
npm run build        # Production build
npm run start:prod   # Production start
```

### Frontend Development

```bash
cd Frontend
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
```

### Database Schema

The backend automatically creates the required table on startup:

```sql
CREATE TABLE IF NOT EXISTS plugin_releases (
  id SERIAL PRIMARY KEY,
  version VARCHAR(50) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_data BYTEA NOT NULL,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_current BOOLEAN DEFAULT false
);
```

## 🚀 Deployment

### Backend Deployment

1. Set production environment variables
2. Build the application: `npm run build`
3. Start: `npm run start:prod`
4. Ensure PostgreSQL is accessible

### Frontend Deployment

1. Set production `API_URL` and `NEXT_PUBLIC_API_URL`
2. Build: `npm run build`
3. Start: `npm run start`
4. Configure reverse proxy if needed

### Important Notes

- **File Upload Limit**: Backend supports up to 1GB uploads
- **Direct Backend Calls**: Admin uploads bypass Next.js proxy to support large files
- **CORS**: Backend enables CORS for all origins (configure for production)
- **Authentication**: Uses HTTP Basic Auth (consider OAuth for production)

## 🔐 Security Considerations

- Change default admin credentials in production
- Use HTTPS in production environments
- Configure CORS to specific origins
- Consider implementing rate limiting
- Use environment-specific secrets
- Regular security audits for dependencies

## 📝 API Endpoints

### Public Endpoints
- `GET /api/plugin/info` - Get current plugin information
- `GET /api/plugin/download` - Download current plugin release

### Admin Endpoints
- `POST /api/admin/upload` - Upload new plugin version (requires Basic Auth)

## 🤝 Contributing

This is a research project (25-26J-451) at SLIIT. For contributions or inquiries, please contact the development team.

## 📄 License

© 2026 SpringForge · Research Project 25-26J-451 · SLIIT
