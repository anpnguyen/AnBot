import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Messages from "./Messages";

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

    try {
      const response = await axios.post("/api/df_text_query", {
        text: userText
      });

      for (let msg of response.data.fulfillmentMessages) {
        let says = {
          speaks: "bot",
          msg: msg
        };
        console.log(says.msg);

        setResponse(says);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (response) {
      console.log(response);
      setMessages([...messages, response]);
    }
  }, [response]);

  const df_event_query = async eventName => {
    const res = await axios.post("/api/df_event_query", { event: eventName });

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg
      };

      setMessages([...messages, says]);
    }
  };

  const chatbotMessages = stateMessages => {
    if (stateMessages) {
      return messages.map((message, i) => {
        return (
          <Messages
            speaks={message.speaks}
            key={i}
            text={message.msg.text.text}
          />
        );
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
      setMessages([...messages, says]);
      df_text_query(formData.userMessage);
    }
  };

  useEffect(() => {
    if (inputFocus) {
      inputFocus.current.focus();
    }
  });

  useEffect(() => {
    console.log(messages);
    if (lastMessage) {
      lastMessage.current.scrollIntoView();
    }
  }, [messages]);

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
