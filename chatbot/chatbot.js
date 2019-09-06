'use strict'

const dialogflow = require("dialogflow");

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
                    languageCode: process.env.DIALOGFLOW_LANGUAGE,
                },
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




    handleAction: function(responses){
        return responses;
    }
}

