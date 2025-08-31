# AI Chat Application

A full-stack chat application built with React and Node.js that allows users to have conversations with an AI assistant powered by OpenAI's GPT model.

## Features

- 🔐 **User Authentication** - Secure signup/login with session-based auth
- 💬 **Real-time chat** with AI assistant
- 📝 **Multiple conversation threads** per user
- ⚡ **Typing effect** for AI responses
- 📱 **Responsive design**
- 🔄 **Thread management** (create, switch, delete)
- 💾 **Persistent chat history** with user isolation
- 🎨 **Modern UI** with Font Awesome icons
- 🛡️ **Secure sessions** stored in MongoDB

## Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **React Markdown** - Markdown rendering for AI responses
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database for data and session storage
- **Mongoose** - MongoDB ODM
- **OpenAI API** - AI chat completions
- **Express-session** - Session-based authentication
- **connect-mongo** - MongoDB session store
- **bcryptjs** - Password hashing

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- OpenAI API key

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-chat-app
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the `Backend` directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   MONGODB_URI=mongodb://localhost:27017/chatapp
   SESSION_SECRET=your_session_secret_key_here
   PORT=8080
   ```

## Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm start
   ```
   Server will run on `http://localhost:8080`

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Check authentication status

### Chat Routes (Protected)
- `POST /api/chat` - Send message and get AI response
- `GET /api/thread` - Get user's conversation threads
- `GET /api/thread/:threadid` - Get specific thread messages
- `DELETE /api/thread/:threadid` - Delete a thread

## Project Structure

```
├── Backend/
│   ├── models/
│   │   ├── Thread.js          # Chat thread schema
│   │   └── User.js            # User schema with auth
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── chat.js            # Chat API routes
│   ├── middleware/
│   │   └── auth.js            # Authentication middleware
│   ├── utils/
│   │   └── openai.js          # OpenAI integration
│   └── server.js              # Express server with session config
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx       # Chat display component
│   │   │   ├── ChatWindow.jsx # Main chat interface
│   │   │   ├── Slidebar.jsx   # Thread sidebar
│   │   │   ├── Login.jsx      # Login component
│   │   │   └── Signup.jsx     # Signup component
│   │   ├── context/
│   │   │   └── MyContext.jsx  # React context with auth
│   │   └── App.jsx            # Main app with routing
│   └── index.html
└── README.md
```

## Usage

1. **Sign up** for a new account or **log in** with existing credentials
2. Once authenticated, you'll see the chat interface
3. **Start a new conversation** by typing a message
4. The AI will respond with a typing effect
5. **Create multiple threads** for different conversations
6. **Switch between threads** using the sidebar
7. **Delete threads** using the minus icon
8. **Log out** when finished


## Acknowledgments

- OpenAI for providing the GPT API