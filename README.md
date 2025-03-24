# HomyStay - Apartment Booking Web App

This is a full-stack web application for apartment booking.

---

## Requirements

Before you begin, ensure you have the following installed:

- PHP (>=8.0)
- Composer (latest version)
- Node.js (>=18.x)
- NPM (latest version)
- MySQL (or any supported database)
- Prettier (for Tailwind class sorting plugin)

---

## Installation Steps

### Clone the Repository

Navigate to your projects directory (optional):

```
cd ~/projects
```

Clone the repository:

```
git clone https://github.com/alamy2711/HomyStay.git
```

Move into the project directory:

```
cd HomyStay
```

### Install Backend Dependencies

Install PHP dependencies:

```
composer install
```

Copy and configure the environment file:

```
cp .env.example .env
```


### Install Frontend Dependencies

Navigate to the frontend directory:

```
cd frontend
```

Install JavaScript dependencies:

```
npm install
```

### Install TailwindCSS, Flowbite, and Prettier Plugin

Install TailwindCSS with CLI:

```
npm install tailwindcss @tailwindcss/cli
```

Install Flowbite for Tailwind components:

```
npm install flowbite
```

Install Tailwind class sorting plugin (requires Prettier):

```
npm install -D prettier prettier-plugin-tailwindcss
```

---

## Running the Project

### Start the Backend Server

Navigate to the project root:

```
cd ..
```

Start the Laravel server:

```
php artisan serve
```

### Start the Frontend

Navigate to the frontend folder:

```
cd frontend
```

Start the React development server:

```
npm run dev
```

### Start Tailwind Watcher

Run TailwindCSS CLI to generate styles:

```
npm run twdev
```

The site will be available at:

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

