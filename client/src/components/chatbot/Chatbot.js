import React, { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import ChatbotMessages from "./ChatbotMessages";
import Back from '../../images/Wavey-Fingerprint.svg'

// import Messages from "./Messages";
// import Card from "./Card";
// import QuickReply from "./QuickReply";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState();
  const [formData, setFormData] = useState({ userMessage: "" });
  const lastMessage = useRef();
  const inputFocus = useRef();



  useEffect(() => {
    if (response) {
      setMessages([...messages, response]);
    }
  }, [response]);

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

  const dialogflow_text_query = async userText => {
    
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
      const response = await axios.post("/dialogflow_text_query", {
        text: userText
      });

      for (let msg of response.data.fulfillmentMessages) {
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

  const dialogflow_event_query = async eventName => {
    const res = await axios.post("/dialogflow_event_query", {
      event: eventName
    });
    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg
      };

      setMessages([...messages, says]);
    }
  };
  useEffect(() => {
    dialogflow_event_query("welcome");
  }, []);


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
        }  
      });
    } else {
      return null;
    }
  };

  const handleFormChange = e => {
    setFormData({ [e.target.name]: e.target.value });
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      dialogflow_text_query(formData.userMessage);
      setTimeout(setFormData({ userMessage: "" }), 0);
    }
  };

  const style ={
    backgroundImage: `url(${Back})`
  }
  return (
    <div className="chatbot" style={style}>
      
      <div className='chatbotHeader'>
        <div className="chatbotheaderX">
          x
        </div>
      </div>
      <div className="chatbotMessagesContainer">
        {chatbotMessages(messages)}
        <div ref={lastMessage}></div>
      </div>
      <div className="chatbotInput">
      <input
        type="text"
        name="userMessage"
        value={formData.userMessage}
        onChange={handleFormChange}
        onKeyPress={handleKeyPress}
        ref={inputFocus}
        placeholder="Enter your text here"
      />
      </div>
      
    </div>
  );
};

export default Chatbot;
