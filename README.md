# 🌍 WanderLust


WanderLust is a Node.js web application that lets users browse, create, edit, and review unique travel accommodations — from beachfront villas in Bali and ski chalets in Aspen to historic castles in Scotland and desert oases in Dubai. It supports full user authentication, image uploads, interactive maps, and review functionality.


## ✨ Features

- 🏠 **Browse Listings** — Explore curated stays across categories: Trending, Mountains, Castles, Rooms, Camping, Farms, Amazing Pools, and more
- ➕ **Create & Manage Listings** — Authenticated users can add new properties with images, pricing, location, and category tags
- ✏️ **Edit & Delete** — Owners can update or remove their own listings
- ⭐ **Reviews & Ratings** — Users can leave reviews on listings they've visited
- 🔐 **User Authentication** — Secure signup, login, and session management using Passport.js
- 🗺️ **Map Integration** — Interactive maps powered by Mapbox for each listing's location
- ☁️ **Cloud Image Uploads** — Images stored and served via Cloudinary
- 💸 **GST Pricing Display** — Optional toggle to display total price including 18% GST
- 📱 **Responsive Design** — Mobile-friendly UI built with Bootstrap

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Templating** | EJS (Embedded JavaScript) |
| **Database** | MongoDB (via Mongoose) |
| **Authentication** | Passport.js (Local Strategy) |
| **Session Management** | express-session + connect-mongo |
| **Image Storage** | Cloudinary + Multer |
| **Maps** | Mapbox GL JS |
| **Validation** | Joi |
| **Styling** | CSS + Bootstrap |
| **Deployment** | Render |

---

## 📁 Project Structure

```
WANDERLUST/
├── controllers/        # Route handler logic (listings, reviews, users)
├── models/             # Mongoose schemas (Listing, Review, User)
├── routes/             # Express routers (listing, review, user routes)
├── views/              # EJS templates
│   ├── listings/       # Index, show, new, edit views
│   ├── users/          # Login, signup views
│   └── layouts/        # Shared boilerplate (header, footer)
├── public/             # Static assets (CSS, JS, images)
├── utils/              # Helper utilities (ExpressError, wrapAsync)
├── init/               # Seed data for database initialization
├── middleware.js        # Custom middleware (auth checks, ownership)
├── schema.js           # Joi validation schemas
├── cloudConfig.js      # Cloudinary configuration
├── app.js              # Main Express app entry point
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Cloudinary](https://cloudinary.com/) account
- [Mapbox](https://www.mapbox.com/) account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manhuu14/WANDERLUST-.git
   cd WANDERLUST-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret_key

   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret

   MAP_TOKEN=your_mapbox_public_token
   ```

4. **Seed the database** *(optional)*
   ```bash
   node init/index.js
   ```

5. **Start the server**
   ```bash
   node app.js
   ```

6. Open your browser and visit `http://localhost:8080/listings`



## 🌐 Deployment

This project is deployed on **Render** with a persistent MongoDB Atlas database and Cloudinary for image storage.

Live URL: [https://wanderlust-qica.onrender.com/listings](https://wanderlust-qica.onrender.com/listings)

> ⚠️ Note: The free tier on Render spins down after inactivity — the first load may take 30–60 seconds.

---


## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request


---

<p align="center">Made with ❤️ and wanderlust</p>
