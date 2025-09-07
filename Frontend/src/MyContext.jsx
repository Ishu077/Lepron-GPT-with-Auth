//making this for sharing the state!! across different components
import React, { createContext, useState, useEffect } from "react";
import {v1 as uuidv1} from 'uuid';

export const MyContext = createContext();
  //$ all below
// Context Provider Component
export const MyContextProvider = ({ children }) => {
    // Existing state
    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState(null);
    const [currThreadId, setCurrThreadId] = useState(uuidv1()); // Generate initial thread ID
    const [prevChats, setPrevChats] = useState([]);
    const [newChat, setNewChat] = useState(true);
    const [allThreads, setAllThreads] = useState([]);

    // Authentication state
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    // Check authentication status on app load
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/me', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setAuthLoading(false);
        }
    };

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        // Reset chat state for new user
        setAllThreads([]);
        setPrevChats([]);
        setNewChat(true);
        setCurrThreadId(null);
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:8080/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear all state regardless of API call success
            setUser(null);
            setIsAuthenticated(false);
            setAllThreads([]);
            setPrevChats([]);
            setNewChat(true);
            setCurrThreadId(null);
            setPrompt("");
            setReply(null);
        }
    };

    const providerValues = {
        // Existing values
        prompt, setPrompt,
        reply, setReply,
        currThreadId, setCurrThreadId,
        prevChats, setPrevChats,
        newChat, setNewChat,
        allThreads, setAllThreads,

        // Authentication values
        user,
        isAuthenticated,
        authLoading,
        login,
        logout,
        checkAuthStatus
    };

    return (
        <MyContext.Provider value={providerValues}>
            {children}
        </MyContext.Provider>
    );
};


