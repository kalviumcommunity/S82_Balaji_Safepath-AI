# Optifit AI
(AI-powered Fitness & Nutrition Consultant)

## Project Overview
FitGenie AI is a MERN-based AI fitness assistant that provides personalized workout routines, meal plans, and health tips. It uses prompt engineering, structured outputs, function calling, and RAG (Retrieval-Augmented Generation) to deliver accurate and dynamic responses.

### Key Features
- ✅ Personalized Workout Plans (Home/Gym)

- ✅ Calorie-based Meal Suggestions

- ✅ Fitness Goal Tracking (Weight Loss, Muscle Gain, etc.)

- ✅ Integration with Wearables for real-time data

- ✅ RAG-powered updates with latest health and fitness guidelines

#### Tech Stack

- Frontend: React.js

- Backend: Node.js + Express.js

- Database: MongoDB (Mongoose for ORM)

- AI Integration: OpenAI GPT API

- RAG: FAISS or Pinecone for vector search

#### APIs:

Nutrition Data API (Edamam, Spoonacular)

Wearable API (Fitbit, Google Fit)

Authentication: JWT

Deployment: Docker + AWS / Vercel

### AI Concepts Implementation

1. Prompting

2. Structured Output

3. Function Calling

4. Retrieval-Augmented Generation (RAG)

#### Project Workflow

- User Inputs → Age, gender, goal, diet, budget.

- Prompt Creation → Combine user + system prompts.

- OpenAI Model → Returns structured output (JSON).

- Function Calls → Fetch calories, recipes.

- RAG Layer → Add latest research & recipes.

- Final Response → Sent to frontend for display.

### Installation

Backend Setup

# Clone repo
git clone https://github.com/your-username/fitgenie-ai.git
cd fitgenie-ai

# Install backend dependencies
npm install

# Create .env file
OPENAI_API_KEY=your_key
MONGODB_URI=your_mongo_uri

# Start server

npm run dev

#### Frontend Setup

cd client
npm install
npm start

### Usage

Access API at: http://localhost:5000

Frontend runs on: http://localhost:3000

#### Evaluation Criteria

Correctness: Accurate diet & workout plans.

Efficiency: Fast API responses with caching.

Scalability: Handles multiple users with optimized MongoDB queries.

### Next Steps
- ✅ Add voice chatbot.

- ✅ Connect to meal delivery APIs.

- ✅ Add AI-powered progress photo analysis.
