# OptiFit AI 🏋️‍♂️🍎🤖

An AI-powered fitness assistant built with the MERN stack, offering personalized workouts, meal plans, and health insights.

## 📌 Overview

OptiFit AI combines the flexibility of the MERN stack with AI capabilities to help users achieve their health and fitness goals.
The app:

Generates personalized workout plans based on user preferences and fitness level.

Suggests custom meal plans aligned with dietary needs.

Offers AI-driven health insights for better decision-making.

## 🚀 Features
✅ AI-generated workout routines tailored to the user
✅ Smart meal planning based on nutrition data
✅ Progress tracking with visual analytics
✅ Responsive UI for mobile & desktop
✅ Scalable backend API with efficient data retrieval

## 🛠 Tech Stack
Frontend: React.js, Redux/Context API, TailwindCSS / Material-UI

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

AI Integration: OpenAI API / TensorFlow.js (for recommendation logic)

Deployment: Vercel / Netlify (Frontend), Render / Heroku (Backend)


### ⚙️ Installation & Setup
1️⃣ Clone the repository

git clone https://github.com/kalviumcommunity/OptiFit-AI.git
cd OptiFit-AI

2️⃣ Install dependencies


# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3️⃣ Run the project

# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start

## 📊 API Endpoints
Method	Endpoint	Description
POST	/api/users	Register new user
POST	/api/auth/login	Authenticate user
GET	/api/workouts	Get AI-generated workout plan
GET	/api/meals	Get personalized meal plan
GET	/api/insights	Retrieve AI-based health insights

### 📈 Evaluation Criteria Alignment
✅ Correctness – Returns accurate AI-generated plans based on user data.
✅ Efficiency – Uses optimized queries and caching for faster responses.
✅ Scalability – Backend API supports high traffic with load balancing potential.

#### 🤝 Contributing
Contributions are welcome!

Fork the repo

Create a feature branch

Commit changes

Open a Pull Request

