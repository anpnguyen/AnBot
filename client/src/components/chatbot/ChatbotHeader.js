import React from "react";
import './ChatbotHeader.css'

const ChatbotHeader = (props) => {

    const {isOpen, setIsOpen} = props

  return (
    <div className="chatbotHeader">
      <div className="chatbotheaderX" onClick={() => setIsOpen(!isOpen)}>
        x
      </div>
    </div>
  );
};

export default ChatbotHeader;
