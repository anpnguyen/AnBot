const { WebhookClient } = require("dialogflow-fulfillment");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function snoopy(agent) {
    agent.add(`Welcome to my Snoopy fulfillment!`);
  }
  function courses(agent) {
    // agent.add(`thhs!`);
    console.log(agent.parameters)
    let responseText = `you want to learn about ${agent.parameters.course}`
    agent.add(responseText)
  }
 

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  let intentMap = new Map();
  intentMap.set("snoopy", snoopy);
  intentMap.set("courses", courses);
  intentMap.set("Default Fallback Intent", fallback);

  agent.handleRequest(intentMap);
});

module.exports = router;
