const dialogflow = require("dialogflow");
const structjson = require("structjson");
const Registration = require("../models/Registration");

const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: JSON.parse(process.env.GOOGLE_PRIVATE_KEY)
};
const projectID = process.env.GOOGLE_PROJECT_ID;
const sessionClient = new dialogflow.SessionsClient({
  projectID: projectID,
  credentials: credentials
});

const sessionPath = sessionClient.sessionPath(
  process.env.GOOGLE_PROJECT_ID,
  process.env.DIALOGFLOW_SESSION_ID
);

const chatbot = {
  textQuery: async function(text, parameters = {}) {
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
    responses = await this.handleAction(responses);
    return responses;
  },

  eventQuery: async function(event, parameters = {}) {
    const request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          parameters: structjson.jsonToStructProto(parameters),
          languageCode: process.env.DIALOGFLOW_LANGUAGE
        }
      }
    };

    let responses = await sessionClient.detectIntent(request);
    responses = await this.handleAction(responses);
    return responses;
  },

  handleAction: function(responses) {
    let queryResult = responses[0].queryResult;

    switch (queryResult.action) {
      case "recommendcourses.recommendcourses-yes":
        if (queryResult.allRequiredParamsPresent) {
          this.saveRegistration(queryResult.parameters.fields);
        }
    }
    return responses;
  },

  saveRegistration: async fields => {
    const registrationData = new Registration({
      name: fields.name.stringValue,
      address: fields.address.stringValue,
      phone: fields.phone.stringValue,
      email: fields.email.stringValue
    });

    try {
      let res = await registrationData.save();
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = chatbot;
