import "./ChatWindow.css";
import Chat from "./Chat";
import { MyContext } from "./MyContext";
import { useContext } from "react";
import { useState } from "react";

import {ScaleLoader} from 'react-spinners';
import { useEffect } from "react";
function ChatWindow(){
    const {prompt,setPrompt,reply,setReply,currThreadId,prevChats,setPrevChats,setNewChat,user,logout}=useContext(MyContext);
    const [loading, setLoading]=useState(false);
    const [isOpen,setIsOpen]=useState(false); //set to false as default value!


    const getReply=async()=>{
        // Check if prompt is empty    //this is new for authentiction $
        if (!prompt.trim()) {
            alert('Please enter a message');
            return;
        }

        // Check if currThreadId exists
        if (!currThreadId) {       //$
            alert('Thread ID is missing. Please refresh the page.');
            return;
        }

        setNewChat(false); //as we donot want to show the "Start a newchat or Ask Anything once we send our first chat!"
        console.log("Debug - message:", prompt, "threadid:", currThreadId); // Debug log
        setLoading(true);
        const requestBody = {
            message: prompt,     // these are the 2 things which is required by the /api/chat path!
            threadid: currThreadId,
        };

        console.log("Debug - Request body:", requestBody); // Debug log

        const options={
            method:"POST",
            headers:{
                // "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type":"application/json"
            },
            credentials: 'include', // Include session cookies
            body:JSON.stringify(requestBody)
        }

        try{ 
            //http://localhost:8080
            const response=await fetch("https://lepron-gpt-with-auth.onrender.com/api/chat",options);
            console.log(response);
            const data=await response.json();
            console.log(data);

            if (response.ok) {
                setReply(data.reply);
            } else {
                console.error('Chat request failed:', data);
                alert(`Error: ${data.error || 'Something went wrong'}`);
            }
        }catch(err){
            console.log(err);
            alert('Network error. Please try again.');
        }
        setLoading(false);
    }

    const handleProfileClick=()=>{
        setIsOpen(!isOpen);
    }

    //append new chats to prevChats
    useEffect(()=>{
        if(prompt && reply){
            setPrevChats([...prevChats,{role:"user",content:prompt,timestamp:Date.now()},{role:"assistant",content:reply,timestamp:Date.now()}]);
        }
        setPrompt("");
    },[reply]);

    
    return(
        <div className="chatWindow">

            <div className="navbar">  {/*Navbar */}
                <span>Lepron GPT<i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                 <span className="userIcon"> <i className="fa-solid fa-user"></i></span>
                </div>
            </div>

            {
                isOpen && <div className="dropDown">
                    <div className="dropDownItem user-info">
                        <i className="fa-solid fa-user"></i> {user?.username}
                    </div>
                    <div className="dropDownItem">Upgrade Plan <i className="fa-solid fa-cloud-arrow-up"></i></div>
                    <div className="dropDownItem">Settings <i className="fa-solid fa-gear"></i></div>
                    <div className="dropDownItem" onClick={logout}>Log Out <i className="fa-solid fa-right-from-bracket"></i></div>
                    {/* <div className="dropDownItem">Item4</div> */}
                </div>
            }

            <Chat ></Chat>
            
            <ScaleLoader color="white" loading={loading} ></ScaleLoader>  {/*see the documnetation of the react-spinners for its props!*/ }
            <div className="chatInput">   {/*chat input*/}
                <div className="inputBox">
                    <input placeholder="Ask Anything" value={prompt}
                    onChange={(e)=>setPrompt(e.target.value)}  //you
                    onKeyDown={(e)=>{if(e.key==="Enter"){getReply()}}}  //to get the reply when we press the enter key! same as clicking on the submit button!
                    />
                    <div id="submit"  onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">Lepron GPT can make mistakes. Check important info. See Cookie Preferences.</p>
            </div>

        </div>
    );
}
export default ChatWindow;