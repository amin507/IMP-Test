# Assessment Test - PT Informatika Media Pratama

## Overview
A **full-stack blog application** built using **Laravel** as the backend and **Next.js** as the frontend, featuring authentication and complete CRUD operations for posts.

---

## Tech Stack

### Backend
- **Laravel 10**
- **MySQL**
- **Laravel Sanctum** (Authentication)

### Frontend
- **Next.js 14**
- **TypeScript**
- **Tailwind CSS**
- **DaisyUI**

### Containerization
- **Docker**
- **Docker Compose**

---


---

## Features Implemented

### Core Features
- **User Authentication** (Sign Up, Sign In, Sign Out)
- **Post Management** (Create, Read, Update, Delete)
- **List all posts** with pagination
- **View post details**
- **Create new post**
- **Edit existing post**
- **Delete post**

### UI Requirements
- Clean UI using **DaisyUI** components
- Fully **responsive design**

---

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and run all services
docker compose up --build

# Run in background
docker compose up -d --build

# Stop all services
docker compose down
```

## Manual Setup

Backend (Laravel)

```bash
cd laravel-backend
composer install
cp .env.example .env
php artisan key:generate

-> Update .env with your database configuration
php artisan migrate
php artisan db:seed
php artisan serve
```
Frontend (Next.js)
```
cd nextjs-frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
npm run dev
```

## Access Points
```
Service	URL
Frontend: http://localhost:3000
Backend API: http://localhost:8000
MySQL Database: localhost:3306
```


## Default Credentials
```
User Test: 
admin@example.com = admin123
demo@example.com = password

```

## API Endpoints
```
# Authentication
| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| `POST` | `/api/register` | User registration |
| `POST` | `/api/login`    | User login        |
| `POST` | `/api/logout`   | User logout       |


# Posts
| Method   | Endpoint          | Description                |
| -------- | ----------------- | -------------------------- |
| `GET`    | `/api/posts`      | List posts with pagination |
| `POST`   | `/api/posts`      | Create new post            |
| `PUT`    | `/api/posts/{id}` | Update post                |
| `DELETE` | `/api/posts/{id}` | Delete post                |

```

## Docker Services
```
| Service           | Description              | Port   |
| ----------------- | ------------------------ | ------ |
| `laravel-backend` | PHP 8.2 + Laravel API    | `8000` |
| `nextjs-frontend` | Node.js 18 + Next.js app | `3000` |
| `mysql`           | MySQL 8.0 database       | `3306` |

```

## Special Notes
- Uses Laravel Sanctum for secure API authentication
- Implements authorization policies for post management
- Fully responsive UI with DaisyUI
- Docker Compose setup included for quick deployment