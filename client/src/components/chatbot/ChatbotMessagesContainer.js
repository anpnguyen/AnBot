import React from 'react'
import ChatBotMessages from './ChatbotMessages'

const ChatbotMessagesContainer = (props) => {
    const {messages} = props

    console.log(messages)
    const renderMessages = (messages)=>{
        messages.map((message, i) => {
            if (message.msg && message.msg.text && message.msg.text.text) {
              return (
                <>
                <p>{message.msg.text.text}</p>   
                <ChatBotMessages
                  speaks={message.speaks}
                  key={i}
                  text={message.msg.text.text}
                />
                </>
              );
    } else{
        return null
    }
    })}
    
    
    
    
        
    return (
        <div>
            <h1>this is the containe</h1>
            {renderMessages(messages)}
        </div>
    )
}

export default ChatbotMessagesContainer


