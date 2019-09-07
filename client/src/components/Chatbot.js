import React, { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import Messages from "./Messages";
import Card from "./Card";
import QuickReply from "./QuickReply";


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState();
  const lastMessage = useRef();
  const inputFocus = useRef();

  useEffect(() => {
    df_event_query("welcome");
  }, []);

  const df_text_query = async userText => {
    console.log("calling text");
    let says = {
      speaks: "user",
      msg: {
        text: {
          text: userText
        }
      }
    };
    setMessages([...messages, says]);

    try {
      const response = await axios.post("/df_text_query", {
        text: userText
      });

      for (let msg of response.data.fulfillmentMessages) {
        // console.log(JSON.stringify(msg))
        let says = {
          speaks: "bot",
          msg: msg
        };
        setResponse(says);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (response) {
      setMessages([...messages, response]);
    }
  }, [response]);

  const df_event_query = async eventName => {
    const res = await axios.post("/df_event_query", { event: eventName });

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg
      };

      setMessages([...messages, says]);
    }
  };

  const renderCards = cards => {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  };

  const renderQuickReplies = (quickReplies, i) => {
    return (
      <QuickReply
        key={i}
        payload={quickReplies}
        speaks="bot"
        replyClick={handleQuickReplyPayload}
      />
    );
  };

  const chatbotMessages = stateMessages => {
    if (stateMessages) {
      return messages.map((message, i) => {
        if (message.msg && message.msg.text && message.msg.text.text) {
          return (
            <Messages
              speaks={message.speaks}
              key={i}
              text={message.msg.text.text}
            />
          );
        } else if (
          message.msg &&
          message.msg.payload &&
          message.msg.payload.fields &&
          message.msg.payload.fields.cards
        ) {
          return (
            <Fragment key={i}>
              {renderCards(message.msg.payload.fields.cards.listValue.values)}
            </Fragment>
          );
        } else if (
          message.msg &&
          message.msg.payload &&
          message.msg.payload.fields &&
          message.msg.payload.fields.quickReplies
        ) {
          return (
            <Fragment>
              <p>{message.msg.payload.fields.text.stringValue}</p>
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

  const [formData, setFormData] = useState({ userMessage: "" });

  const handleFormChange = e => {
    setFormData({ [e.target.name]: e.target.value });
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      let says = {
        speaks: "user",
        msg: {
          text: {
            text: formData.userMessage
          }
        }
      };
      
      df_text_query(formData.userMessage);
      setTimeout(setFormData({userMessage:""}),0)
    }
  };

  useEffect(() => {
    if (inputFocus) {
      inputFocus.current.focus();
    }
  });

  useEffect(() => {
    if (lastMessage) {
      lastMessage.current.scrollIntoView();
    }
  }, [messages]);

  const handleQuickReplyPayload = (event, payload, text) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(payload);

    switch (payload) {
      case "training_masterclass":
        df_event_query("MASTERCLASS");
        break;
      default:
        df_text_query(text);
        break;
    }
  };

  return (
    <div>
      <h1>this is where the chat bot will go</h1>

      <div>{chatbotMessages(messages)}</div>
      <input
        type="text"
        name="userMessage"
        value={formData.userMessage}
        onChange={handleFormChange}
        onKeyPress={handleKeyPress}
        ref={inputFocus}
      />
      <div ref={lastMessage}>This is the last message</div>
    </div>
  );
};

export default Chatbot;
