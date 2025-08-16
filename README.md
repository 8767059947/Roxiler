# Store Rater - Full-Stack Web Application
---

## ✨ Features

### 👤 **Authentication & General**
-   **Secure JWT Authentication**: Secure user login and registration flow using JSON Web Tokens.
-   **Password Management**: Users can update their password after logging in.
-   **Role-Based Access Control**: The UI and API are tailored to provide different functionalities for 3 distinct roles.

### 👨‍💻 **Normal User**
-   **View & Search Stores**: Browse a list of all available stores with a real-time search by name or address.
-   **Rate Stores**: Submit a 1-5 star rating for any store.
-   **Modify Ratings**: Update a previously submitted rating.
-   **View Ratings**: See the overall average rating of a store and their own submitted rating.

### 👑 **System Administrator**
-   **Full-Fledged Dashboard**: An interactive dashboard with real-time stats (Total Users, Stores, Ratings).
-   **User Management**: View a list of all users, with dynamic filtering (by name, email, role) and sorting.
-   **Store Management**: Add new stores to the platform.
-   **User Creation**: Add new users with specific roles (Admin, Store Owner, etc.).

### 🏪 **Store Owner**
-   **Dedicated Dashboard**: View performance metrics for their own store.
-   **Performance Metrics**: See the calculated average rating of their store.
-   **Customer Insights**: View a list of all users who have submitted a rating for their store.

---

## 🛠️ Tech Stack

-   **Frontend**: React.js, Vite, React Router, Tailwind CSS, Axios
-   **Backend**: Node.js, Express.js
-   **Database**: PostgreSQL (connected via NeonDB)
-   **ORM**: Prisma

---

## 🚀 Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

-   Node.js (v18 or higher)
-   npm
-   A running PostgreSQL database (you can get a free one from [Neon](https://neon.tech/))

### 1. Backend Setup

```bash
# 1. Clone the repository
git clone [https://github.com/YourUsername/store-rating-app.git](https://github.com/YourUsername/store-rating-app.git)
cd store-rating-app

# 2. Install backend dependencies
npm install

# 3. Create a .env file in the root directory
#    Copy the contents of .env.example (create this file) into it
#
#    Your .env file should look like this:
#    DATABASE_URL="YOUR_POSTGRESQL_CONNECTION_URL_FROM_NEONDB"
#    JWT_SECRET="YOUR_SUPER_SECRET_KEY_FOR_JWT"
#    PORT=8000

# 4. Apply database migrations
npx prisma migrate dev

# 5. Start the backend server
npm start
# The server will be running on http://localhost:8000
```

### 2. Frontend Setup

```bash
# 1. Navigate to the frontend directory from the root
cd frontend

# 2. Install frontend dependencies
npm install

# 3. Start the frontend development server
npm run dev
# The app will be running on http://localhost:5173 (or another port)
```
---

## 🤝 Author

-   **[Veer Pardeshi]** - [https://github.com/8767059947]
