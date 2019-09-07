import React from 'react'

const Messages = (props) => {

    const {speaks, text} = props
    return (
        <div className='border'>

            <p>{speaks}</p>
            <p>{text}</p>
            
        </div>
    )
}

export default Messages
