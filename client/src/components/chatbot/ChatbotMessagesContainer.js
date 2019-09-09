import React, { Fragment, useRef, useEffect } from "react";
import ChatbotMessages from "./ChatbotMessages";
import QuickReply from "./QuickReply";

const ChatbotMessagesContainer = props => {
  const { messages, handleQuickReplyPayload } = props;
  const lastMessage = useRef();

  useEffect(() => {
    if (lastMessage) {
      lastMessage.current.scrollIntoView();
    }
  }, [messages]);

  const chatbotMessages = stateMessages => {
    if (stateMessages) {
      return messages.map((message, i) => {
        if (message.msg && message.msg.text && message.msg.text.text) {
          return (
            <ChatbotMessages
              speaks={message.speaks}
              key={i}
              text={message.msg.text.text}
            />
          );
        } else if (
          message.msg &&
          message.msg.payload &&
          message.msg.payload.fields &&
          message.msg.payload.fields.quickReplies
        ) {
          return (
            <Fragment key={i}>
              {renderQuickReplies(
                message.msg.payload.fields.quickReplies.listValue.values
              )}
            </Fragment>
          );
        }
      });
    } else {
      return null;
    }
  };

  const renderQuickReplies = (quickReplies, i) => {
    return (
      <QuickReply
        key={i}
        payload={quickReplies}
        speaks="AnBot"
        replyClick={handleQuickReplyPayload}
      />
    );
  };
  return (
    <div className="chatbotMessagesContainer">
      {chatbotMessages(messages)}
      <div ref={lastMessage}></div>
    </div>
  );
};

export default ChatbotMessagesContainer;
