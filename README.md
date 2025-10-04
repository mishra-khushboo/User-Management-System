
# 👤 User Management System

A full-stack web application built with **Node.js**, **Express.js**, **MySQL**, and **EJS** that allows users to **create, read, update, and delete** user records in a MySQL database. This project demonstrates **CRUD operations**, **form handling**, and **server-side rendering**.

---

## 🚀 Features

* 🧑‍💻 **Create** new users with unique IDs
* 📋 **View** all users stored in the database
* ✏️ **Update** username after password verification
* ❌ **Delete** existing users
* 🗄️ Server-side rendering with **EJS templates**
* ⚙️ Supports **PATCH** and **DELETE** requests using method-override

---

## 🧩 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL (via `mysql2` package)
* **Templating Engine:** EJS
* **Utilities:** Faker.js (for unique IDs), Method-Override
* **Frontend:** HTML + EJS templates

---

## 📁 Folder Structure

```
User-Management-System/
│
├── views/
│   ├── home.ejs         # Displays total number of users
│   ├── showuser.ejs     # Shows all users
│   ├── edit.ejs         # Form to edit username
│   └── new.ejs          # Form to add new user
│
├── app.js               # Main server file
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/mishra-khushboo/User-Management-System.git
cd User-Management-System
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup MySQL database**

```sql
CREATE DATABASE delta_app;
USE delta_app;

CREATE TABLE user (
  id VARCHAR(100) PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100),
  password VARCHAR(50)
);
```

4. **Configure database connection** in `app.js` (if needed)

```js
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: ""  // Add your MySQL password if needed
});
```

5. **Run the application**

```bash
node app.js
```

6. **Open in your browser**

```
http://localhost:8080/
```

---

## 📜 Routes Overview

| Route              | Method | Description                                   |
| ------------------ | ------ | --------------------------------------------- |
| `/`                | GET    | Displays total number of users                |
| `/user`            | GET    | Show all users                                |
| `/user/new`        | GET    | Render form to add new user                   |
| `/newUser`         | POST   | Add new user to DB                            |
| `/user/:id/edit`   | GET    | Render edit form for a user                   |
| `/user/:id`        | PATCH  | Update username (after password verification) |
| `/user/:id/delete` | DELETE | Delete a user from DB                         |

---

## 💡 Key Concepts Learned

* CRUD operations with MySQL
* Server-side rendering using EJS
* Handling PATCH and DELETE requests via method-override
* Using Faker.js for generating unique IDs
* Express routing and middleware

---

## 🧾 Dependencies

```json
"dependencies": {
  "@faker-js/faker": "^9.x",
  "express": "^4.x",
  "ejs": "^3.x",
  "mysql2": "^3.x",
  "method-override": "^3.x",
  "path": "^0.12.x"
}
```

---

## ⚠️ Notes / Precautions

* This project is **safe to publish**; it contains no sensitive passwords or API keys.
* For real projects, consider **hashing passwords** (e.g., using bcrypt).
* Add a `.gitignore` to exclude `node_modules/` and `.env` files.

---

## 📦 Future Improvements

* Implement **user authentication/login/logout**
* Add **password hashing**
* Improve UI using **Bootstrap** or **Tailwind CSS**
* Add **search and pagination** for users

