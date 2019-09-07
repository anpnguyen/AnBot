import React from 'react'
import QuickReplyChild from './QuickReplyChild'

const QuickReply = (props) => {
    // props.payload

  

    const handleClick= (event, payload, text)=>{
        props.replyClick(event, payload, text);
    }

    const renderQuickReplies = (quickReplies)=>{
        if(quickReplies){
            return quickReplies.map( (quickReply,i) =>{
                return(
                    <QuickReplyChild key={i} payload={quickReply.structValue} click={handleClick}/>
                )
            })
        }
        else{
            return null
        }

    }

    return (
        <div>
            <div>{props.speaks}</div>
            <div>{renderQuickReplies(props.payload)}</div>
        </div>
    )
}

export default QuickReply
