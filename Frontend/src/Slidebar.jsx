import "./Slidebar.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import { useEffect } from "react";
import {v1 as uuidv1} from 'uuid';
function Slidebar() {

  const {allThreads, setAllThreads,currThreadId,newChat,setNewChat,setPrompt,setReply,setCurrThreadId,setPrevChats}=useContext(MyContext);
  const getAllThreads=async ()=>{  //this function will be usedd in useEffect!
        // console.log("message : ",prompt," threadid ",currThreadId)
        const options={
            method:"GET",
            headers:{
                // "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type":"application/json"
            },
            credentials: 'include', //$ Include session cookies
        }
        try{
            const response=await fetch("http://localhost:8080/api/thread",options);
            // console.log(response);

            if (!response.ok) {    //$ this is the addidional check of the error
                console.error('Failed to fetch threads:', response.status);
                setAllThreads([]); // Set empty array on error
                return;
            }

            const data=await response.json();
            console.log(data);

            // Check if data is an array before mapping
            if (Array.isArray(data)) {   //$ this if statement!
                //storing the title and threadId
                const filteredData=data.map(thread=>{
                  return {threadid: thread.threadid, title:thread.title}   // why reture is used coz I have take curly brackets not  ()
                });

                console.log(filteredData);
                setAllThreads(filteredData);
            } else {     // $ this else too
                console.error('Expected array but got:', typeof data, data);
                setAllThreads([]); // Set empty array if not an array
            }

        }catch(err){
            console.log(err);
            setAllThreads([]); // Set empty array on error
        }
  }
  const createNewChat=async()=>{
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());  //new chat new Id
    setPrevChats([])  //all the prev chats of new chat whould be null or empty array

  }

  const ChangeThread=async(newthreadid)=>{
    setCurrThreadId(newthreadid);

    try{
      const response=await fetch(`http://localhost:8080/api/thread/${newthreadid}`, {
        credentials: 'include' // Include session cookies  //$
      });
      const data=await response.json();
      console.log(data);
      setPrevChats(data);
      setNewChat(false);
      setReply(null);  // why to prevent the typing effect on the latest reply , coz it didb't know about the latest reply! being from the prev thread!
    }catch(err){
      console.log(err);
    }
  }

  const deleteThread=async(threadid)=>{
    let options={
      method:"DELETE",
      credentials: 'include' //$ Include session cookies  
    }
    try{
      let response= await fetch(`http://localhost:8080/api/thread/${threadid}`,options);
      let resp=await response.json();
      console.log(resp);

      //now we want to re-render the slidebar!!
      //so we re call the setAllThreads

      // setAllThreads(prev=>prev.filter(thread=>thread.threadid!==threadid))
      getAllThreads();  //the above setAllThreads was also doing the same thing !

      //if in a scenerio we delete our current thread -> in that case our chat would still be visible
      // so we we call the new chat in that case!
      if(currThreadId==threadid){
        createNewChat();
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getAllThreads();
  },[currThreadId]);

  return (
    <section className="slidebar">
      
      <button onClick={createNewChat}>
        <img src="src/assets/blacklogo.png" alt="lepron GPT" className="logo"/>

        {/* <FontAwesomeIcon icon={byPrefixAndName.fas['pen-to-square']} /> */}
        {/* //we could have chooseen the react code as mentioned above but then we had to import the packages! */}
        <span><i className="fa-solid fa-pen-to-square"></i></span> {/*since I am using html code  I have to add the fontawesome cdn link in the head tag in the index.html file! */ }
      </button>

      {/* history */}
      <ul className="history">
        {
          allThreads?.map((thread,idx)=>(
            // return  
            <li key={idx} className={currThreadId === thread.threadid ? "highlighted" : ""}  onClick={()=>ChangeThread(thread.threadid)}>{thread.title} 
              <i className="fa-solid fa-trash"
                onClick={(e)=>{
                  e.stopPropagation();  //to stop event bubbling!!
                  deleteThread(thread.threadid);
                }}
              >

              </i>
              
            </li> 
            
          ))  

        }
      </ul>
      {/* sign */}

      <div className="sign">
        <p>By Kanav</p>
      </div>

    </section>
  );
}

export default Slidebar;
