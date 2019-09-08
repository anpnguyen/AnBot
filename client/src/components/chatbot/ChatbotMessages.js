import React from "react";

const ChatbotMessages = props => {
  const { speaks, text } = props;
  return (
    <div>
      <div
        className={speaks !== "bot" ? "chatbotMessageFloat" : "chatbotMessage"}
      >
        <div className={speaks === "bot" ? "avatarAnBot" : "avatarUser"}>
          <p>{speaks}</p>
        </div>

        <div className={speaks === "bot" ? "messageArea" : "messageAreaLeft"}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotMessages;
