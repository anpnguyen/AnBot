import React from "react";
import './ChatbotMessages.css'

const ChatbotMessages = props => {
  const { speaks, text } = props;
  return (
    <div>
      <div
        className={speaks !== "AnBot" ? "chatbotMessageFloat" : "chatbotMessage"}
      >
        <div className={speaks === "AnBot" ? "avatarAnBot" : "avatarUser"}>
          <p>{speaks}</p>
        </div>

        <div className={speaks === "AnBot" ? "messageArea" : "messageAreaLeft"}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotMessages;
