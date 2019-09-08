import React from 'react'
import Chatbot from './chatbot/Chatbot'
import Avatar from '../images/ava.svg'
const Landing = () => {

   
    return (
        <div className="landing">
            
            <img src={Avatar} alt="robot avatar for this chatbot" className='landingImg'/>
            <h1>Hello! I'm AnBot</h1>
            <h2>What do you want to know about me?</h2>

            {/* <button>Check out the Code</button> */}
            

            <Chatbot/>

             
        </div>
    )
}

export default Landing
