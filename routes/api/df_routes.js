const express = require("express");
const router = express.Router();
const chatbot = require('../../chatbot/chatbot')
// const Recipe = require("../../models/Recipe");
// const User = require("../../models/User");



router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/df_text_query", async (req, res) => {
  console.log('calling')
  let responses = await chatbot.textQuery(req.body.text,  req.body.parameters);
        res.send(responses[0].queryResult);
});

router.post("/df_event_query", async (req, res) => {
  console.log('event')
  let responses = await chatbot.eventQuery(req.body.event,  req.body.parameters);
        res.send(responses[0].queryResult);
});

module.exports = router;
