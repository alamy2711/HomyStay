# HomyStay - Apartment Booking Web App

This is a full-stack web application for apartment booking.

---

## ✅ Requirements

Before you begin, ensure you have the following installed:

- PHP (>=8.0)
- Composer (latest version)
- Node.js (>=18.x)
- NPM (latest version)
- MySQL (or any supported database)
- Prettier (for Tailwind class sorting plugin)

---

## ⚙️ Installation Steps

### I. Clone the Repository

Clone the repository:

```
git clone https://github.com/alamy2711/HomyStay.git
```

### II. Install Backend Dependencies

1. Install PHP dependencies:

```
composer install
```

2. Copy and configure the environment file:

```
cp .env.example .env
```

3. Generate App Key:

```
php artisan key:generate
```

4. Link Storage:

```
php artisan storage:link
```
Run Fresh Migrations and Seed the Database:

```
php artisan migrate:fresh --seed
```


### III. Install Frontend Dependencies

1. Navigate to the frontend directory:

```
cd frontend
```

2. Install JavaScript dependencies:

```
npm install
```

3. Copy and configure the environment file:

```
cp .env.example .env
```

---

## 🚀 Running the Project

### I. Start the Backend Server

1. Navigate to the project root:

```
cd ..
```

2. Start the Laravel server:

```
php artisan serve
```

### II. Start the Frontend

1. Navigate to the frontend folder:

```
cd frontend
```

2. Start the React development server:

```
npm run dev
```

3. The website will be available at:

```
http://localhost:3000
```

---

## Additional Notes

- Ensure your `.env` file in Laravel is configured correctly with the database connection.
- Make sure Prettier is installed in your code editor for automatic Tailwind class sorting.
- If you face any issues, try running:

```
npm cache clean --force
composer dump-autoload
```

