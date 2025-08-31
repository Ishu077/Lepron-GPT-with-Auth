
import './App.css'
import Slidebar from './Slidebar'
import ChatWindow from "./ChatWindow.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { MyContext, MyContextProvider } from "./MyContext.jsx";
import { useState, useContext } from 'react';
import {v1 as uuidv1} from 'uuid';

// Main App Content Component
function AppContent() {
  const { isAuthenticated, authLoading } = useContext(MyContext);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  if (authLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="auth-wrapper">
        {authMode === 'login' ? (
          <Login onSwitchToSignup={() => setAuthMode('signup')} />
        ) : (
          <Signup onSwitchToLogin={() => setAuthMode('login')} />
        )}
      </div>
    );
  }

  return (
    <div className='app'>
      <Slidebar />
      <ChatWindow />
    </div>
  );
}

// Main App Component
function App() {
  return (
    <MyContextProvider>
      <AppContent />
    </MyContextProvider>
  )
}

export default App
