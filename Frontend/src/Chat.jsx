import "./Chat.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import { useState } from "react";
//react- markdown  for formatting the gpt generated text!
//rehype-highlight   for code block highlighting!m / syntac highlighting
 // both are the npm packeages!
import ReactMarkdown from "react-markdown"; 
import rehypeHighlight from "rehype-highlight";
//to import is importing a CSS theme for the highlight.js library-->
import "highlight.js/styles/github-dark.css";

function Chat(){
    const {newChat,prevChats,reply}=useContext(MyContext);
    const [latestReply,setLatestReply]=useState(null);

    useEffect(()=>{
        if(reply===null){  // tjis is for when we click on the prev threads we just want to preint the prev chats and not the typing effect! but then there would be the prb in priniting go to line
            setLatestReply(null);
            return;
        }
        //latestReply separate=>typing effect
        if(!prevChats?.length) return;

        const content=reply.split(" "); //individuals words
        let idx=0;
        //now creating the effect of the typing effect!
        const interval=setInterval(()=>{
            setLatestReply(content.slice(0,idx+1).join(" "));
            idx++;
            if(idx>=content.length){
                clearInterval(interval);
            }
        },40)
        return ()=>clearInterval(interval);
    },[prevChats,reply]);

    return (
        <>
        {newChat && <h1>Ask anything</h1>}

        <div className="chats">
            {   
                prevChats?.slice(0,-1).map((chat,idx)=>{  //slicing aout the last reply of gpt!
                    if(chat.role=="user"){
                        return(
                            <div className="userDiv" key={idx}>
                                <p className="userMessage">
                                    {chat.content}
                                </p>
                            </div>
                        );
                    }else{
                        return(
                            <div className="gptDiv" key={idx}>
                                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                                    {chat.content}
                                </ReactMarkdown>
                                    
                            </div>
                        );
                    }
                })
            }   
                {//here if you have come ffrom above- but then it will never print the last reply of the chat 
                // so we need to find the way to make it print when we donot want the typing effect!
                }
                {
                    //printing the latest reply with typing effect!
                    prevChats.length>0 && latestReply!==null && 
                        <div className="gptDiv" key={"typing"}>
                            <ReactMarkdown rehypePlugins={rehypeHighlight}>
                                {latestReply}
                            </ReactMarkdown>
                        </div>
                    
                }
                {
                    prevChats.length>0 && latestReply===null &&   //latest reply is null that means it is a prev thread! so no typing effect needed
                        <div className="gptDiv" key={"non-yping"}>
                            <ReactMarkdown rehypePlugins={rehypeHighlight}>
                                {prevChats[prevChats.length-1].content}
                            </ReactMarkdown>
                        </div>
                }
            
        </div>
        </>
    );
}
export default Chat;