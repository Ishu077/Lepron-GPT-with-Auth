# AI Chat Application

A full-stack chat application built with React and Node.js that allows users to have conversations with an AI assistant powered by OpenAI's GPT model.

## Features

- 💬 Real-time chat with AI assistant
- 📝 Multiple conversation threads
- ⚡ Typing effect for AI responses
- 📱 Responsive design
- 🔄 Thread management (create, switch, delete)
- 💾 Persistent chat history
- 🎨 Modern UI with Font Awesome icons

## Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **React Markdown** - Markdown rendering for AI responses
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **OpenAI API** - AI chat completions

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

- `POST /api/chat` - Send message and get AI response
- `GET /api/thread` - Get all conversation threads
- `GET /api/thread/:threadid` - Get specific thread messages
- `DELETE /api/thread/:threadid` - Delete a thread

## Project Structure

```
├── Backend/
│   ├── models/
│   │   └── Thread.js          # MongoDB schema
│   ├── routes/
│   │   └── chat.js            # API routes
│   ├── utils/
│   │   └── openai.js          # OpenAI integration
│   └── server.js              # Express server setup
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx       # Chat display component
│   │   │   ├── ChatWindow.jsx # Main chat interface
│   │   │   └── Slidebar.jsx   # Thread sidebar
│   │   ├── context/
│   │   │   └── MyContext.jsx  # React context
│   │   └── App.jsx            # Main app component
│   └── index.html
└── README.md
```

## Usage

1. Open the application in your browser
2. Start a new conversation by typing a message
3. The AI will respond with a typing effect
4. Create multiple threads for different conversations
5. Switch between threads using the sidebar
6. Delete threads using the minus icon


## Acknowledgments

- OpenAI for providing the GPT API