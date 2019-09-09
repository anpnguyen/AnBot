import React from "react";
import QuickReplyChild from "./QuickReplyChild";

const QuickReply = props => {
  const { speaks } = props;

  const handleClick = (event, payload, text) => {
    props.replyClick(event, payload, text);
  };

  const renderQuickReply = quickReplies => {
    if (quickReplies) {
      return quickReplies.map((quickReply, i) => {
        return (
          <QuickReplyChild
            key={i}
            payload={quickReply.structValue}
            click={handleClick}
          />
        );
      });
    } else {
      return null;
    }
  };

  return (
    <div>
      <div
        className={
          speaks !== "AnBot" ? "chatbotMessageFloat" : "chatbotMessage"
        }
      >
        <div className={speaks === "AnBot" ? "avatarAnBot" : "avatarUser"}>
          <p>{speaks}</p>
        </div>

        <div className="quickReplyContainer">
          {renderQuickReply(props.payload)}
        </div>
      </div>
    </div>
  );
};

export default QuickReply;
