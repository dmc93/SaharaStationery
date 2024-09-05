import React from 'react'
import { useState } from 'react'
import axios from 'axios';

export default function Chatbot() {

    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
console.log(prompt)
        axios
            .post("http://localhost:8081/chat",{prompt})
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                console.error(err)
                // setResponse(err);
            })
    }

    return(
        <div>
                    <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <form align="center" onSubmit={handleSubmit}>
                <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
                <br/>
                <button type="submit"> Submit </button>
            </form>
                <br/>
            <div>
                <p>
                    Response from OpenAI:   {response} 
                </p>
            </div>

        </div>
    )
}
