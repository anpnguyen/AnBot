import React from "react";
import Chatbot from "./chatbot/Chatbot";
import Avatar from "../images/ava.svg";
const Landing = () => {
  return (
    <div className="landing">
      <img
        src={Avatar}
        alt="robot avatar for this chatbot"
        className="landingImg"
      />
      {/* Image Sourced from https://publicdomainvectors.org under the Openclipart licence*/}
      <h1>Hello! I'm AnBot</h1>
      <h2>Get to know An Nguyen by asking me questions</h2>

      <Chatbot />
    </div>
  );
};

export default Landing;
