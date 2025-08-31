import 'dotenv/config';

const getOpenAiResponse= async (message)=>{
    //all this options to try-catch block is the standard way to handle the fecth req from the api/endpoint
    console.log(message);
    const options={   
        method:"POST",
        headers:{
            "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "model": "gpt-4o-mini",
            "messages": [
            {
                "role": "user",
                // "content": `${req.body.message}`  
                "content": message
            }
            ]
        })
    }

    try{
        const resp=await fetch("https://api.openai.com/v1/chat/completions",options);
        const data=await resp.json();
        console.log(data.choices[0].message.content);
        // res.send(data);
        return data.choices[0].message.content;
    }catch(err){
        console.log(err);
    }

}
export default getOpenAiResponse;