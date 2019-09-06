"use strict";

const dialogflow = require("dialogflow");
const structjson = require('structjson')

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(
  process.env.GOOGLE_PROJECT_ID,
  process.env.DIALOGFLOW_SESSION_ID
);

module.exports = {
  textQuery: async function(text, parameters = {}) {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: process.env.DIALOGFLOW_LANGUAGE
        }
      },
      queryParams: {
        payload: {
          data: parameters
        }
      }
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },

  eventQuery: async function(event, parameters = {}) {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: process.env.DIALOGFLOW_LANGUAGE
        }
      },
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    return responses;
  },


  handleAction: function(responses) {
    return responses;
  }
};
