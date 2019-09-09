import React from "react";

const ChatBotOpenButton = props => {
  const { isOpen, setIsOpen } = props;
  return (
    <div className={`${!isOpen ? "open" : "close"} chatbotButtonContainer`}>
      <button className="chatbotButton" onClick={() => setIsOpen(!isOpen)}>
        Chat with me!
      </button>
    </div>
  );
};

export default ChatBotOpenButton;
