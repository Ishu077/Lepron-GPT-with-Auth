import express from "express";
import Thread from "../models/Thread.js"
import getOpenAiResponse from "../utils/openai.js";
import { requireAuth } from "../middleware/auth.js";

const router =express.Router(); //or express.Router();
//here $ in all middleware as requireAuth!
router.post("/test",async(req,res)=>{  //test route!
    try{
        const thread = new Thread({
            threadid:"xyz2",
            title: "testing sample 2",
        })
        const resp=await thread.save();
        res.send(resp);
    }catch(err){
        console.log(err);
        
    }
})
//as you can see we are not making use of controllers coz our backend is not much complex wo this much modularity is enough!

router.get("/thread", requireAuth, async(req,res)=>{  // Get user's threads only
    try{
        //sorting these threads according to the updatedat field, filtered by user
        const threads = await Thread.find({userId: req.user.id}).sort({updatedat:-1});  // -1 suggest we want to sort in descending order

        res.json(threads);
        // res.send(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Failed to fetch the threads" });
    }
});

router.get("/thread/:threadid", requireAuth, async (req,res)=>{
    let id=req.params.threadid;
    try{
        const resp=await Thread.findOne({threadid:id, userId: req.user.id});  // Filter by user as well
        if (!resp) return res.status(404).json({ error: "No threads found" });

        res.json(resp.messages);

    }catch(err){
        console.log(err)
        res.status(500).json({ error: "Failed to fetch the thread " });
    }
})

router.delete("/thread/:threadid", requireAuth, async(req,res)=>{
    let id=req.params.threadid;
    try{
        const resp=await Thread.findOneAndDelete({threadid:id, userId: req.user.id});
        if (!resp) return res.status(404).json({ error: "No such threads exist" });
        // res.send(resp);
        res.status(200).json({ message: "Thread deleted successfully" });
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Failed to delete the Thread" });
    }
})

router.post("/chat", requireAuth, async (req,res)=>{
    let {threadid,message}=req.body;
    console.log('Chat request body:', req.body); // Debug log
    console.log('User from middleware:', req.user); // Debug log

    if(!threadid || !message){
        console.log('Missing fields - threadid:', threadid, 'message:', message); // Debug log
        res.status(400).json({ error: "missing required fields" });
        return;
    }
    try{
        let resp=await Thread.findOne({threadid:threadid, userId: req.user.id});
        if(!resp){
            //create the new thread, this means a new chat is being created and this is the first message
            resp= new Thread({
                threadid,
                userId: req.user.id, // Associate with current user
                title:message,
                messages:[{role:"user",content:message}]
            })
        }else{
            resp.messages.push({role:"user",content:message});
        }

        const reply=await getOpenAiResponse(message);
        resp.messages.push({role:"assistant",content:reply});
        //also update the updatedat time
        resp.updatedat=Date.now();
        await resp.save();
        res.json({reply});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Something went wrong!" });
    }
})
export default router;